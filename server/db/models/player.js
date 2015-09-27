'use strict';
var mongoose = require('mongoose');

function setToNum(val){
    if(!val || typeof val == "string")
        return 0;
    else return val;
}


var schema = new mongoose.Schema({
    fantTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
    name: { type: String },
    slot: { type: String },
    team: { type: String },
    position: { type: String },
    opp: { type: String },
    gameStatus: { type: String },
    compOverAtt: { type: String },
    passYards: { type: Number, set: setToNum },
    passTds: { type: Number, set: setToNum },
    ints: { type: Number, set: setToNum },
    rushAtt: { type: Number, set: setToNum },
    rushYards: { type: Number, set: setToNum },
    rushTds: { type: Number, set: setToNum },
    recs: { type: Number, set: setToNum },
    recYards: { type: Number, set: setToNum },
    recTds: { type: Number, set: setToNum },
    targs: { type: Number, set: setToNum },
    twoPC: { type: Number, set: setToNum },
    fums: { type: Number, set: setToNum },
    randTds: { type: Number, set: setToNum },
    DTDs: { type: Number, set: setToNum },
    FR: { type: Number, set: setToNum },
    SCK: { type: Number, set: setToNum },
    SFTY: { type: Number, set: setToNum },
    dInts: { type: Number, set: setToNum },
    BLK: { type: Number, set: setToNum },
    PA: { type: Number, set: setToNum },
    underForty: { type: Number, set: setToNum },
    underFifty: { type: Number, set: setToNum },
    fiftyPlus: { type: Number, set: setToNum },
    XP: { type: Number, set: setToNum },
    totFG: { type: Number, set: setToNum },
    pts: { type: Number, set: setToNum }
});

// schema.pre('validate', function(next){
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passTds || typeof this.passTds=="string") this.passTds = 0;
//     if (!this.ints || typeof this.ints=="string") this.ints = 0;
//     if (!this.rushAtt || typeof this.rushAtt=="string") this.rushAtt = 0;
//     if (!this.rushYards || typeof this.rushYards=="string") this.rushYards = 0;
//     if (!this.rushTds || typeof this.rushTds=="string") this.rushTds = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     if (!this.passYards || typeof this.passYards=="string") this.passYards = 0;
//     next();
// });

mongoose.model('Player', schema);

