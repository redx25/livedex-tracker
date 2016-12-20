#!/usr/bin/env node
// Pulls pokemon info and generates code to make objects of it

const fs = require('fs');
const request = require('superagent');
const jquery = require('jquery');
const jsdom = require('jsdom');

let regions = ['Kanto:', 'Johto:', 'Hoenn:', 'Sinnoh:', 'Unova:', 'Kalos:', 'Alola:'];

// Regexes
const natNumberRegex = /\d\d\d/;
const nameRegex = /(?![\d\d\d ]).*/;
const testNameRegex = /[^a-z0-9]/i;
const escapeRegex = /('|"|`)/;

// Init output with top code
let output = 'import {Seq} from \'immutable\';\n\n';
output += 'const pokemon = new Seq({';

// Pull the information
request
  .get('http://www.serebii.net/pokedex-sm/')
  .end((e, response) => {
    if (e) {
      throw e;
    }

    // init our fake window based on the response we got and start jQuery
    jsdom.env(response.text, (e, window) => {
      if (e) {
        throw e;
      }

      let $ = jquery(window);

      handleDOM($);
    });
  });

function handleDOM($) {
  let regionPokemon = null;
  let number = '';
  let name = '';
  let key = '';

  // Loop through all the regions adding them to output
  for (let i = 0; i < regions.length; i++) {
    console.log(`Starting ${regions[i]}`);
    regionPokemon = $(`option:contains('${regions[i]}')`).parent().children('option');

    // Loop over the options to find all the pokemon
    for (let j = 0; j < regionPokemon.length; j++) {
      // Skip the region option
      console.log(regionPokemon[j].text);
      if (regionPokemon[j].text.includes(regions[i])) {
        continue;
      }

      console.log(`Adding: ${regionPokemon[j].text}...`);

      // Get the pokemon number and name
      number = regionPokemon[j].text.match(natNumberRegex)[0];
      name = regionPokemon[j].text.match(nameRegex)[0].replace(/\n/, '');

      // Check for problematic names
      if (testNameRegex.test(name)) {
        name = name.replace(escapeRegex, '\\$1');
        key = `'${name}'`;
      } else {
        key = name;
      }

      // Add the number and name to output
      output += `
  ${key}: new Seq({
    name: '${name}',
    number: '${number}',
    gen: ${i + 1}
  }),`;
    }
  }

  finish();
}

function finish() {
  // Get rid of the last comma and close the object
  output = output.slice(0, -1);
  output += `\n});\n\n`;
  output += `export default pokemon;\n`;

  // Write output to file
  fs.writeFile('./src/client/js/shared/pokemon-data.js', output, e => {
    if (e) {
      throw e;
    }

    console.log('Done!');
  });
}
