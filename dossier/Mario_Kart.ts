const fs = require(`fs`);
// let Carte = [['.', '.', '.', '.', '.'], ['.', 'S', 'o', '.', '.'], ['.', 'o', '.', '.', 'o'], ['o', '.', '.', 'o', '.'], ['o', 'o', '.', '.', 'E']];
let Carte: string[] = (fs.readFileSync(`./subjectMap.txt`, `utf-8`)).split('\n');
// console.log(Carte);

// fonction pour transformer le code de la Map de manière simple
function ParseMap (Carte: string[]): [number[][], number[]] {
    let tab: number[][] = []
    let SPoint: number[] = []
    for (let départ = 0; départ < Carte.length; départ++){
        let tmp: number[] = []
        
        for (let arrivée = 0; arrivée < Carte.length; arrivée++) {
            if (Carte[départ][arrivée] === '.') {
                tmp.push(0)
            } else if (Carte[départ][arrivée] === 'o') {
                tmp.push(-1)
            } else if (Carte[départ][arrivée] === 'S') {
                tmp.push(-2)
                SPoint = [départ,arrivée]
            } else if (Carte[départ][arrivée] === 'E') {
                tmp.push(-3)
                // SPoint = [départ,arrivée]
            }
        }
        tab.push(tmp)
    }
    return [tab, SPoint]
} 
// console.log(ParseMap(Carte));

// fonction pour vérifier le chemin
let Caarte: number [][] = ParseMap(Carte)[0]
let SPoint: number[] = ParseMap(Carte)[1]

// fonction pour check a legalité

function checkleg (SPoint: number, Carte: number) {
    if (SPoint < 0) {
        return false;
    }
    if (SPoint >= Carte) {
        return false;
    } 
    return true;
}

//algo de lee
function vague(Carte: number[][],SPoint: number[],nbrevague: number) {
    let queue : number[][] = [SPoint]
    let future_pos : number[][] = []
    let find : number = 1
    while (find === 1) {
        // console.log(Carte)
        // console.log(queue)
        future_pos = []
        for ( let i=0; i < queue.length; i++){
                if (checkleg(queue[i][0]-1, Carte.length)) {
                    if (Carte[queue[i][0]-1][queue[i][1]] === 0) {
                        Carte[queue[i][0]-1][queue[i][1]] = nbrevague
                        future_pos.push([queue[i][0]-1,queue[i][1]])
                    }  else if (Carte[queue[i][0]-1][queue[i][1]] === -3) {
                        find = 0
                    }
                }
            //check en dessous du point de départ
                if (checkleg(queue[i][0]+1, Carte.length)) {
                    if (Carte[queue[i][0]+1][queue[i][1]] === 0) {
                        Carte[queue[i][0]+1][queue[i][1]] = nbrevague
                        future_pos.push([queue[i][0]+1,queue[i][1]])
                    }  else if (Carte[queue[i][0]+1][queue[i][1]] === -3) {
                        find = 0
                    }
                }
            //check a droite du point de départ
                if (checkleg(queue[i][1]+1, Carte[0].length)) {
                    if (Carte[queue[i][0]][queue[i][1]+1] === 0) {
                        Carte[queue[i][0]][queue[i][1]+1] = nbrevague
                        future_pos.push([queue[i][0],queue[i][1]+1])
                    }  else if (Carte[queue[i][0]][queue[i][1]+1] === -3) {
                        find = 0
                    }
                }
            //check a gauche du point de départ
                if (checkleg(queue[i][1]-1, Carte[0].length)) {
                    if (Carte[queue[i][0]][queue[i][1]-1] === 0) {
                        Carte[queue[i][0]][queue[i][1]-1] = nbrevague
                        future_pos.push([queue[i][0],queue[i][1]-1])
                    } else if (Carte[queue[i][0]][queue[i][1]-1] === -3) {
                        find = 0
                    }

                }
            
        }
        queue = future_pos
        nbrevague += 1
    }
    return Carte
}
// console.log(SPoint)
console.log(vague(Caarte, SPoint, 1))

