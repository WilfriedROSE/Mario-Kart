"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
//let Carte = [['.', '.', '.', '.', '.'], ['.', 'S', 'o', '.', '.'], ['.', 'o', '.', '.', 'o'], ['o', '.', '.', 'o', '.'], ['o', 'o', '.', '.', 'E']];
var Carte = (0, fs_1.readFileSync)('./sub.txt', 'utf-8').split(' ');
// fonction pour transformer le code de la Map de manière simple
function ParseMap(Carte) {
    var tab = [];
    var SPoint = [];
    var EPoint = [];
    for (var départ = 0; départ < Carte.length; départ++) {
        var tmp = [];
        for (var arrivée = 0; arrivée < Carte[départ].length; arrivée++) {
            if (Carte[départ][arrivée] === '.') {
                tmp.push(0);
            }
            else if (Carte[départ][arrivée] === 'o') {
                tmp.push(-1);
            }
            else if (Carte[départ][arrivée] === 'S') {
                tmp.push(-2);
                SPoint = [départ, arrivée];
            }
            else if (Carte[départ][arrivée] === 'E') {
                tmp.push(-3);
                EPoint = [départ, arrivée];
                // SPoint = [départ,arrivée]
            }
        }
        tab.push(tmp);
    }
    return [tab, SPoint, EPoint];
}
// console.log(ParseMap(Carte));
// fonction pour vérifier le chemin
var Caarte = ParseMap(Carte)[0];
var SPoint = ParseMap(Carte)[1];
var EPoint = ParseMap(Carte)[2];
// fonction pour check a legalité
//algo de lee
function vague(Carte, SPoint, nbrevague) {
    var queue = [SPoint];
    var future_pos = [];
    var find = 1;
    while (find === 1) {
        //for (let i = 0; i < 4; i++) {
        future_pos = [];
        // Chek au dessus du point de départ
        for (var i = 0; i < queue.length; i++) {
            var _a = queue[i], x = _a[0], y = _a[1];
            if (x - 1 >= 0 && x - 1 < Carte[0].length) {
                if (Carte[x - 1][y] === 0) {
                    Carte[x - 1][y] = nbrevague;
                    future_pos.push([x - 1, y]);
                }
                else if (Carte[x - 1][y] === -3) {
                    find = 0;
                }
            }
            //check en dessous du point de départ
            if (x + 1 >= 0 && x + 1 < Carte[0].length) {
                if (Carte[x + 1][y] === 0) {
                    Carte[x + 1][y] = nbrevague;
                    future_pos.push([x + 1, y]);
                }
                else if (Carte[x + 1][y] === -3) {
                    find = 0;
                }
            }
            //check a droite du point de départ
            if (y + 1 >= 0 && y + 1 < Carte[0].length) {
                if (Carte[x][y + 1] === 0) {
                    Carte[x][y + 1] = nbrevague;
                    future_pos.push([x, y + 1]);
                }
                else if (Carte[x][y + 1] === -3) {
                    find = 0;
                }
            }
            //check a gauche du point de départ
            if (y - 1 >= 0 && y - 1 < Carte[0].length) {
                if (Carte[x][y - 1] === 0) {
                    Carte[x][y - 1] = nbrevague;
                    future_pos.push([x, y - 1]);
                }
                else if (Carte[x][y - 1] === -3) {
                    find = 0;
                }
            }
        }
        queue = future_pos;
        nbrevague += 1;
        //console.log(Carte)
    }
    return Carte;
}
// console.log(SPoint)
console.log(vague(Caarte, SPoint, 1));
function retracePath(Carte, EPoint, SPoint) {
    var path = [];
    var current = EPoint;
    var move = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (Carte[current[0]][current[1]] !== Carte[SPoint[0]][SPoint[1]]) {
        path.push(current);
        for (var i = 0; i < move.length; i++) {
            var next = [current[0] + move[i][0], current[1] + move[i][1]];
            console.log(' next ', next);
            path.push(next);
            // ici on verifie si les voisins ont la valeur de la case regardée -1
            // Probleme, la case d'arrivée ( a partir de laquelle ont lance )
            // a une valeur négative. on est donc coincé sur cette case a chercher une valeur qu'on ne trouveras pas
            if (next[0] >= 0 && next[0] < Carte.length && next[1] >= 0 && next[1] < Carte[0].length) {
                if (Carte[next[0]][next[1]] === Carte[current[0]][current[1]] - 1 || Carte[next[0]][next[1]] === -2) {
                    current = next;
                    break;
                }
            }
            path.push(current);
        }
    }
    path.push(current);
    return path;
}
// let result = vague(Caarte, SPoint, 1);
// console.log(result)
// let chemin = retracePath(result, EPoint, SPoint);
// console.log("Le Chemin le plus court : ", chemin);
