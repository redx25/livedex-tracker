import fs from 'fs';
import gm from 'gm';
import pokemon from '../src/client/js/shared/pokemon-data';
import removeDiacritics from './remove-diacritics';

const farfetchdRegex = /'|(\.$)|:/g;
const cleanRegex = /[^a-z0-9]/ig;

let id = 0;
let paddedId = padId(id + 1);
let css = '';
let xOffset = 1;
let pkmn = null;

function start() {
  fs.access('./tools/sprites', err => {
    if (err) {
      throw new Error('Need a ./tools/sprites folder');
    }

    fs.readdir('./tools/sprites', (err, files) => {
      if (err) {
        throw err;
      }

      if (files.length > 1) {
        fs.access('./dist/client/img', err => {
          if (err) {
            fs.mkdir('./dist/client/img', () => {
              handlePokemon();
            });
          } else {
            handlePokemon();
          }
        });
      } else {
        throw new Error('Need more sprites');
      }
    });
  });
}

function padId(id) {
  id = id.toString();

  while (id.length < 3) {
    id = '0' + id;
  }

  return id;
}

function handlePokemon() {
  // Write start of css
  css += `.pkspr {
  background-image: url("/img/pokemon.png");
  background-repeat: no-repeat;
  height: 30px;
  width: 40px;
}\n\n`;

  // Set up pokemon dat for easy iteration
  pkmn = pokemon.valueSeq();

  // Init the base image
  gm(1, 1, '#000000FF').write('./dist/client/img/pokemon.png', e => {
    if (e) {
      throw e;
    }

    combine();
  });
}

function combine() {
  // Check if at the end of the pokemon and write css file if so
  if (!pkmn.get(id)) {
    console.log('Writing css to file...');
    fs.writeFile('./src/client/css/pokemon-sprites.scss', css, e => {
      if (e) {
        throw e;
      }

      console.log('Done!');
    });
    return;
  }

  console.log('Adding: ' + pkmn.get(id).get('name'));

  // Set up file name
  let filename = removeDiacritics(pkmn.get(id).get('name'));
  filename = filename
    .replace(farfetchdRegex, '')
    .replace(cleanRegex, '-')
    .toLowerCase();

  let pokemonImage = `./tools/sprites/${filename}.png`;
  gm(pokemonImage).size((e, size) => {
    if (e) {
      throw e;
    }

    // Add pokemon to css
    css += `.pkmn-${paddedId} {background-position: -${xOffset}px -0px;}\n`;

    // Add offset induced by this mon
    xOffset += size.width;

    // Append pokemon image to atlas
    gm('./dist/client/img/pokemon.png')
      .background('#000000FF')
      .append(pokemonImage, true)
      .write('./dist/client/img/pokemon.png', e => {
        if (e) {
          throw e;
        }

        // Start process over
        paddedId = padId(++id + 1);
        combine();
      });
  });
}

start();
