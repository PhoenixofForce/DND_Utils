import { Dice } from '../dice.js'
export { rollSpell, spells }

function rollSpell(spell, level, type) {
  if(!type && type !== 0) type = -1;
  if(!level && level !== 0) level = spell.level;

  if(level < spell.level) {
    return {
      dice: "",
      throws: [],
      result: 0,
    }
  }

  let lvlDiff = level - spell.level;
  let dice = [];

  //>-| Collect all dice |-<\\
  for(let i = 0; i < spell.basedamage.length; i++) {
    let base = spell.basedamage[i];
    let lvl = spell.perlevel[i];

    lvl = new Dice(Math.floor((base.getCount() % 1) + lvl.getCount() * lvlDiff), lvl.getMax());
    base = new Dice(base.getCount() - (base.getCount() % 1), base.getMax());

    if(base.getCount() > 0) dice.push(base);
    if(lvl.getCount() > 0) dice.push(lvl);
  }

  //>-| Combine same dice 2d8 + 2d8 = 4d8 |-<\\
  for(let i = dice.length - 1; i >= 0; i--) {
    for(let j = i + 1; j < dice.length; j++) {
      if(dice[i].getMax() == dice[j].getMax()) {
        dice[i] = new Dice(dice[i].getCount() + dice[j].getCount(), dice[i].getMax())
        dice.splice(j, 1);

        j--;
      }
    }
  }

  let diceStr = dice.join(" + ");
  let throws = dice.map(e => e.rollType(type));
  let result = throws.reduce((a, c) => a + c)

  let out = {
    dice: diceStr,
    throws: throws,
    result: result,
  };

  return out;
}

let spells = [

    //>-| AAAAAAAAAAAA |-<\\
    { name: "Abi-Dalzim's Horrid Wilting",    level: 8, basedamage: [new Dice(12, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Absorb Elements",                level: 1, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Aganazzar's Scorcher",           level: 2, basedamage: [new Dice(3, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Alter Self",                     level: 2, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Animate Objects (Tiny)",         level: 5, basedamage: [new Dice(10, 4), new Dice(40, 1)], perlevel: [new Dice(2, 4), new Dice(8, 1)] },
    { name: "Animate Objects (Small)",        level: 5, basedamage: [new Dice(10, 8), new Dice(20, 1)], perlevel: [new Dice(2, 8), new Dice(4, 1)] },
    { name: "Animate Objects (Medium)",       level: 5, basedamage: [new Dice(10, 6), new Dice(1, 1)], perlevel: [new Dice(2, 6), new Dice(1, 1)] },
    { name: "Animate Objects (Large)",        level: 5, basedamage: [new Dice(2.5, 10), new Dice(2.5, 10), new Dice(2.5, 1), new Dice(2.5, 1)], perlevel: [new Dice(0.5, 10), new Dice(0.5, 10), new Dice(0.5, 1), new Dice(0.5, 1)] },
    { name: "Animate Objects (Huge)",         level: 5, basedamage: [new Dice(2.25, 12), new Dice(0.25, 12), new Dice(4.25, 1), new Dice(0.25, 1), new Dice(0.25, 1), new Dice(0.25, 1)], perlevel: [new Dice(0.25, 12), new Dice(0.25, 12), new Dice(0.25, 1), new Dice(0.25, 1), new Dice(0.25, 1), new Dice(0.25, 1)] },
    { name: "Armor of Agathys",               level: 1, basedamage: [new Dice(5, 1)], perlevel: [new Dice(5, 1)] },
    { name: "Arms of Hadar",                  level: 1, basedamage: [new Dice(2, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Aura of Vitality",               level: 3, basedamage: [new Dice(2, 6)], perlevel: [new Dice(0, 0)] },

    //>-| BBBBBBBBBBBB |-<\\
    { name: "Banishing Smite",                level: 5, basedamage: [new Dice(5, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Bigby's Hand (Clench)",          level: 5, basedamage: [new Dice(4, 8)], perlevel: [new Dice(2, 8)] },
    { name: "Bigby's Hand (Grasp)",           level: 5, basedamage: [new Dice(2, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Blade Barrier",                  level: 5, basedamage: [new Dice(6, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Blade of Disaster",              level: 9, basedamage: [new Dice(4, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Blade of Disaster (Crit)",       level: 9, basedamage: [new Dice(12, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Blight",                         level: 4, basedamage: [new Dice(8, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Blinding Smite",                 level: 3, basedamage: [new Dice(3, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Bones of the Earth",             level: 6, basedamage: [new Dice(6, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Bones of the Earth (Max)",       level: 6, basedamage: [new Dice(36, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Branding Smite",                 level: 2, basedamage: [new Dice(2, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Burning Hands",                  level: 1, basedamage: [new Dice(3, 6)], perlevel: [new Dice(1, 6)] },

    //>-| CCCCCCCCCCCC |-<\\
    { name: "Call Lightning",                 level: 3, basedamage: [new Dice(3, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Call Lightning (Storm)",         level: 3, basedamage: [new Dice(4, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Catapult",                       level: 1, basedamage: [new Dice(3, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Chain Lightning",                level: 6, basedamage: [new Dice(10, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Chain Lightning (Max)",          level: 6, basedamage: [new Dice(40, 8)], perlevel: [new Dice(10, 8)] },
    { name: "Chaos Bold",                     level: 1, basedamage: [new Dice(2, 8), new Dice(1, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Chromatic Orb",                  level: 1, basedamage: [new Dice(3, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Circle of Death",                level: 6, basedamage: [new Dice(8, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Cloud of Daggers",               level: 2, basedamage: [new Dice(4, 4)], perlevel: [new Dice(2, 4)] },
    { name: "Cloudkill",                      level: 5, basedamage: [new Dice(5, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Color Spray",                    level: 1, basedamage: [new Dice(6, 10)], perlevel: [new Dice(2, 10)] },
    { name: "Cone of Cold",                   level: 5, basedamage: [new Dice(8, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Conjure Barrage",                level: 3, basedamage: [new Dice(3, 8)], perlevel: [new Dice(0,0)] },
    { name: "Conjure Volley",                 level: 5, basedamage: [new Dice(8, 8)], perlevel: [new Dice(0,0)] },
    { name: "Control Water",                  level: 4, basedamage: [new Dice(2, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Cordon of Arrows",               level: 2, basedamage: [new Dice(4, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Create Homunkukus",              level: 6, basedamage: [new Dice(2, 4)], perlevel: [new Dice()]},
    { name: "Crown of Stars",                 level: 7, basedamage: [new Dice(4, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Crown of Stars (Max)",           level: 7, basedamage: [new Dice(28, 12)], perlevel: [new Dice(8, 12)] },
    { name: "Crusader's Mantle",              level: 3, basedamage: [new Dice(1, 4)], perlevel: [new Dice(0, 0)] },
    { name: "Cure Wounds",                    level: 1, basedamage: [new Dice(1, 8)], perlevel: [new Dice(1, 8)] },

    //>-| DDDDDDDDDDDD |-<\\
    { name: "Dark Star",                      level: 8, basedamage: [new Dice(8, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Dawn",                           level: 5, basedamage: [new Dice(4, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Delayed Blast Fireball",         level: 7, basedamage: [new Dice(12, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Destructive Wave",               level: 5, basedamage: [new Dice(10, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Dimension Door",                 level: 4, basedamage: [new Dice(4, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Disintegrate",                   level: 6, basedamage: [new Dice(10, 6), new Dice(40, 1)], perlevel: [new Dice(3, 6), new Dice(0, 0)] },
    { name: "Dissonant Whispers",             level: 1, basedamage: [new Dice(3, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Divine Favor",                   level: 1, basedamage: [new Dice(1, 4)], perlevel: [new Dice(0, 0)] },
    { name: "Dragon's Breath",                level: 2, basedamage: [new Dice(3, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Dream",                          level: 5, basedamage: [new Dice(3, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Dust Devil",                     level: 2, basedamage: [new Dice(1, 8)], perlevel: [new Dice(1, 8)] },

    //>-| EEEEEEEEEEEE |-<\\
    { name: "Earth Tremor",                   level: 1, basedamage: [new Dice(1, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Earthquake",                     level: 8, basedamage: [new Dice(5, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Elemental Bane",                 level: 4, basedamage: [new Dice(2, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Enervation",                     level: 5, basedamage: [new Dice(4, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Ensnaring Strike",               level: 1, basedamage: [new Dice(1, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Erupting Earth",                 level: 3, basedamage: [new Dice(3, 12)], perlevel: [new Dice(1, 12)] },
    { name: "Evard's Black Tentacles",        level: 4, basedamage: [new Dice(3, 6)], perlevel: [new Dice(0, 0)] },

    //>-| FFFFFFFFFFFF |-<\\
    { name: "False Life",                     level: 1, basedamage: [new Dice(1, 4), new Dice(4, 1)], perlevel: [new Dice(0, 0), new Dice(5, 1)] },
    { name: "Feeblemind",                     level: 8, basedamage: [new Dice(4, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Finger of Death",                level: 7, basedamage: [new Dice(7, 8), new Dice(30, 1)], perlevel: [new Dice(0, 0), new Dice(0, 0)] },
    { name: "Fire Shield",                    level: 4, basedamage: [new Dice(2, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Fire Storm",                     level: 7, basedamage: [new Dice(7, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Fireball",                       level: 3, basedamage: [new Dice(8, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Flame Arrows",                   level: 3, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Flame Arrows (max)",             level: 3, basedamage: [new Dice(12, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Flame Blade",                    level: 2, basedamage: [new Dice(3, 6)], perlevel: [new Dice(0.5, 6)] },
    { name: "Flame Strike",   	              level: 5, basedamage: [new Dice(8, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Flaming Sphere",                 level: 2, basedamage: [new Dice(2, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Floquardts Frosty Fireball",     level: 3, basedamage: [new Dice(4, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Forbiddance",                    level: 6, basedamage: [new Dice(5, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Frost Fingers",                  level: 1, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)] },

    //>-| GGGGGGGGGGGG |-<\\
    { name: "Geas",                           level: 5, basedamage: [new Dice(5, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Glyph of Warding",               level: 3, basedamage: [new Dice(5, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Gravity Fissure",                level: 8, basedamage: [new Dice(8, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Gravity Sinkhole",               level: 4, basedamage: [new Dice(5, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Guardian of Nature",             level: 4, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Guiding Bolt",                   level: 1, basedamage: [new Dice(4, 6)], perlevel: [new Dice(1, 6)] },

    //>-| HHHHHHHHHHHH |-<\\
    { name: "Hail of Thorns",                 level: 1, basedamage: [new Dice(1, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Harm",                           level: 6, basedamage: [new Dice(14, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Healing Spirit",                 level: 2, basedamage: [new Dice(1, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Healing Word",                   level: 1, basedamage: [new Dice(1, 4)], perlevel: [new Dice(1, 4)] },
    { name: "Heat Metal",                     level: 2, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Hellish Rebuke",                 level: 1, basedamage: [new Dice(2, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Heroes' Feast",                  level: 6, basedamage: [new Dice(2, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Hex",                            level: 1, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Holy Weapon (Attack)",           level: 5, basedamage: [new Dice(2, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Holy Weapon (Special)",          level: 5, basedamage: [new Dice(4, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Hunger of Hadar",                level: 3, basedamage: [new Dice(2, 6)], perlevel: [new Dice(0, 0)] },

    //>-| IIIIIIIIIIII |-<\\
    { name: "Ice Knife (Attack)",             level: 1, basedamage: [new Dice(1, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Ice Knife (Special)",            level: 1, basedamage: [new Dice(2, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Ice Storm",                      level: 4, basedamage: [new Dice(2, 8), new Dice(4, 6)], perlevel: [new Dice(1, 6), new Dice(0, 0)]},
    { name: "Illusory Dragon",                level: 8, basedamage: [new Dice(7, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Immolation",                     level: 5, basedamage: [new Dice(8, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Immolation (End)",               level: 5, basedamage: [new Dice(4, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Incendiary Cloud",               level: 8, basedamage: [new Dice(10, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Inflict Wounds",                 level: 1, basedamage: [new Dice(3, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Insect Plague",                  level: 5, basedamage: [new Dice(5, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Investiture of Flame",           level: 6, basedamage: [new Dice(4, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Investiture of Ice",             level: 6, basedamage: [new Dice(4, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Investiture of Wind",            level: 6, basedamage: [new Dice(2, 10)], perlevel: [new Dice(0, 0)] },

    //>-| LLLLLLLLLLLL |-<\\
    { name: "Life Transference",              level: 3, basedamage: [new Dice(4, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Lightning Arrow",                level: 3, basedamage: [new Dice(4, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Lightning Bolt",                 level: 3, basedamage: [new Dice(8, 6)], perlevel: [new Dice(1, 6)] },

    //>-| MMMMMMMMMMMM |-<\\
    { name: "Maddening Darkness",             level: 8, basedamage: [new Dice(8, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Maelstrom",                      level: 5, basedamage: [new Dice(6, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Magic Missile (1 Dart)",         level: 1, basedamage: [new Dice(1, 4), new Dice(1, 1)], perlevel: [new Dice(0, 0), new Dice(0, 0)] },
    { name: "Magic Missile (All Dart)",       level: 1, basedamage: [new Dice(3, 4), new Dice(3, 1)], perlevel: [new Dice(1, 4), new Dice(1, 1)] },
    { name: "Magnify Gravity",                level: 1, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Mass Cure Wounds",               level: 5, basedamage: [new Dice(3, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Mass Healing Word",              level: 3, basedamage: [new Dice(1, 4)], perlevel: [new Dice(1, 4)] },
    { name: "Maximilian's Earthen Grasp",     level: 2, basedamage: [new Dice(2, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Meld Into Stone",                level: 3, basedamage: [new Dice(6, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Melf's Acid Arrow",              level: 2, basedamage: [new Dice(4, 4)], perlevel: [new Dice(1, 4)] },
    { name: "Melf's Acid Arrow (End)",        level: 2, basedamage: [new Dice(2, 4)], perlevel: [new Dice(1, 4)] },
    { name: "Melf's Minute Meteors",          level: 3, basedamage: [new Dice(12, 6)], perlevel: [new Dice(4, 6)] },
    { name: "Mental Prison",                  level: 6, basedamage: [new Dice(5, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Mental Prison (Special)",        level: 6, basedamage: [new Dice(10, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Meteor Swarm",                   level: 9, basedamage: [new Dice(40, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Mind Spike",                     level: 2, basedamage: [new Dice(3, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Moonbeam",                       level: 2, basedamage: [new Dice(2, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Mordenkainen's Faithful Hound",  level: 4, basedamage: [new Dice(4, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Mordenkainen's Sword",           level: 7, basedamage: [new Dice(3, 10)], perlevel: [new Dice(0, 0)] },

    //>-| NNNNNNNNNNNN |-<\\
    { name: "Negative Energy Flood",          level: 5, basedamage: [new Dice(5, 12)], perlevel: [new Dice(0, 0)] },

    //>-| OOOOOOOOOOOO |-<\\
    { name: "Otiluke's Freezing Sphere",      level: 6, basedamage: [new Dice(10, 6)], perlevel: [new Dice(1, 6)] },

    //>-| PPPPPPPPPPPP |-<\\
    { name: "Phantasmal Force",               level: 2, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Phantasmal Killer",              level: 4, basedamage: [new Dice(4, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Prayer of Healing",              level: 2, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)]},
    { name: "Prismatic Spray",                level: 7, basedamage: [new Dice(10, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Prismatic Wall",                 level: 9, basedamage: [new Dice(10, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Prismatic Wall (Max)",           level: 9, basedamage: [new Dice(50, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Psychic Scream",                 level: 9, basedamage: [new Dice(14, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Pulse Wave",                     level: 3, basedamage: [new Dice(6, 6)], perlevel: [new Dice(1, 6)] },

    //>-| RRRRRRRRRRRR |-<\\
    { name: "Ravenous Void",                  level: 9, basedamage: [new Dice(5, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Ray of Sickness",                level: 1, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Regenerate",                     level: 7, basedamage: [new Dice(4, 8), new Dice(15, 1)], perlevel: [new Dice(0, 0), new Dice(0, 0)] },
    { name: "Reality Break (1-2)",            level: 8, basedamage: [new Dice(6, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Reality Break (3-5)",            level: 8, basedamage: [new Dice(8, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Reality Break (6-8)",            level: 8, basedamage: [new Dice(10, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Reality Break (9-10)",           level: 8, basedamage: [new Dice(10, 12)], perlevel: [new Dice(0, 0)] },

    //>-| SSSSSSSSSSSS |-<\\
    { name: "Scorching Ray",                  level: 2, basedamage: [new Dice(2, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Scorching Ray (Max)",            level: 2, basedamage: [new Dice(6, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Searing Smite",                  level: 1, basedamage: [new Dice(1, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Shadow Blade",                   level: 2, basedamage: [new Dice(2, 8)], perlevel: [new Dice(0.5, 8)] },
    { name: "Shadow of Moil",                 level: 4, basedamage: [new Dice(2, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Shatter",                        level: 2, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Sickening Radiance",             level: 4, basedamage: [new Dice(4, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Sleep",                          level: 1, basedamage: [new Dice(5, 8)], perlevel: [new Dice(2, 8)] },
    { name: "Snilloc's Snowball Swarm",       level: 2, basedamage: [new Dice(3, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Soul Cage (Steal)",              level: 6, basedamage: [new Dice(2, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Spike Growth",                   level: 2, basedamage: [new Dice(2, 4)], perlevel: [new Dice(0, 0)] },
    { name: "Spirit Guardians",               level: 3, basedamage: [new Dice(3, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Spiritual Weapon",               level: 2, basedamage: [new Dice(1, 8)], perlevel: [new Dice(0.5, 8)] },
    { name: "Spirit Shroud",                  level: 3, basedamage: [new Dice(1, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Staggering Smite",               level: 4, basedamage: [new Dice(4, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Steel Wind Strike",              level: 5, basedamage: [new Dice(6, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Steel Wind Strike (Max)",        level: 5, basedamage: [new Dice(30, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Storm Sphere",                   level: 4, basedamage: [new Dice(2, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Storm Sphere (Attack)",          level: 4, basedamage: [new Dice(4, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Sunbeam",                        level: 6, basedamage: [new Dice(6, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Sunburst",                       level: 8, basedamage: [new Dice(12, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Symbol (Death)",                 level: 7, basedamage: [new Dice(10, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Synaptic Static",                level: 5, basedamage: [new Dice(8, 6)], perlevel: [new Dice(0, 0)] },

    //>-| TTTTTTTTTTTT |-<\\
    { name: "Tasha's Caustic Brew",           level: 1, basedamage: [new Dice(2, 4)], perlevel: [new Dice(2, 4)] },
    { name: "Tasha's Mind Whip",              level: 2, basedamage: [new Dice(3, 6)], perlevel: [new Dice(3, 6)] },
    { name: "Tenser's Transformation",        level: 6, basedamage: [new Dice(2, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Thunder Step",                   level: 3, basedamage: [new Dice(3, 10)], perlevel: [new Dice(1, 10)] },
    { name: "Thunderous Smite",               level: 1, basedamage: [new Dice(2, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Thunderwave",                    level: 1, basedamage: [new Dice(2, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Tidal Wave",                     level: 3, basedamage: [new Dice(4, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Time Ravage",                    level: 9, basedamage: [new Dice(10, 12)], perlevel: [new Dice(0, 0)] },
    { name: "Transmute Rock",                 level: 5, basedamage: [new Dice(4, 8)], perlevel: [new Dice(0, 0)] },

    //>-| VVVVVVVVVVVV |-<\\
    { name: "Vampiric Touch",                 level: 3, basedamage: [new Dice(3, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Vitriolic Sphere",               level: 4, basedamage: [new Dice(10, 4)], perlevel: [new Dice(2, 4)] },
    { name: "Vitriolic Sphere (End)",         level: 4, basedamage: [new Dice(5, 4)], perlevel: [new Dice(0, 0)] },

    //>-| WWWWWWWWWWWW |-<\\
    { name: "Wall of Fire",                   level: 4, basedamage: [new Dice(5, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Wall of Ice",                    level: 6, basedamage: [new Dice(10, 6)], perlevel: [new Dice(2, 6)] },
    { name: "Wall of Ice (Special)",          level: 6, basedamage: [new Dice(5, 6)], perlevel: [new Dice(1, 6)] },
    { name: "Wall of Light",                  level: 5, basedamage: [new Dice(4, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Wall of Thorns",                 level: 6, basedamage: [new Dice(7, 8)], perlevel: [new Dice(1, 8)] },
    { name: "Web",                            level: 2, basedamage: [new Dice(2, 4)], perlevel: [new Dice(0, 0)] },
    { name: "Weird",                          level: 9, basedamage: [new Dice(4, 10)], perlevel: [new Dice(0, 0)] },
    { name: "Whirlwind",                      level: 7, basedamage: [new Dice(10, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Wind Wall",                      level: 3, basedamage: [new Dice(3, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Witch Bolt",                     level: 1, basedamage: [new Dice(1, 12)], perlevel: [new Dice(1, 12)] },
    { name: "Wrath of Nature (Tree)",         level: 5, basedamage: [new Dice(4, 6)], perlevel: [new Dice(0, 0)] },
    { name: "Wrath of Nature (Rock)",         level: 5, basedamage: [new Dice(3, 8)], perlevel: [new Dice(0, 0)] },
    { name: "Wrathful Smite",                 level: 1, basedamage: [new Dice(1, 6)], perlevel: [new Dice(0, 0)] },

    //>-| ZZZZZZZZZZZZ |-<\\
    { name: "Zephyr Strike",                  level: 1, basedamage: [new Dice(1, 8)], perlevel: [new Dice(0, 0)] },
  ];

  spells.sort((a,b) => {
    if (a.name < b.name)
      return -1;
    if ( a.name > b.name)
      return 1;
    return 0;
  });
