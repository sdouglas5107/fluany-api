import Category from "../api/categories/category.model";
import Phrase from "../api/phrases/phrase.model";
import fs from "fs";
import async from "async";
const baseDir = `${__dirname}/raw/`;

function addPhrase(file, langFrom, langTo, nextOuter) {
    return function (category,) {
        fs.readFile(`${baseDir}/${file}`, 'utf8', (err, text)=> {
            if (err)nextOuter();
            let phrases = text.split('\n')
                .filter(n => n != '')
                .map(line => line.trim());

            let i, concat = [phrases.length / 2];
            for (i = 0; i < phrases.length; i = i + 2) {
                concat.push({
                    text: phrases[i],
                    translation: phrases[i + 1]
                })
            }

            async.each(concat, (phrase, nextInner)=> {
                    Phrase.create({
                        text: phrase.text,
                        translation: phrase.translation,
                        category: category._id,
                        langFrom: langFrom,
                        langTo: langTo
                    }).then(nextInner).catch(nextInner);
                },
                ()=> {
                    nextOuter();
                });

        });

    }
}

function addCategories() {
    fs.readdir(baseDir, (err, files) => {
        async.each(files,
            (file, next) => {
                let parts = file.split(/\.|-/);
                parts.pop();//Removing file extension
                let langTo = parts.pop();
                let langFrom = parts.pop();
                let category = parts.join('-');
                Category.create({
                    name: category
                }).then(addPhrase(file, langFrom, langTo, next)).catch(next);
            },
            ()=> {
                console.log("Population Finished");
            });
    });
}

//Starting population
Category.remove().exec()
    .then(()=> {
        Phrase.remove().exec()
            .then(()=>addCategories());
    });
