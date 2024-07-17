import { PlayerPositionEnum } from "./PlayerPositionEnum"

export function TeamMapper(teaminfo: TeamInfo) {
    const { players, country } = teaminfo

    return players.map((p) => {
        let name = ''
        let backNumber = 0

        switch (country) {
            case 'Spain':
                switch (p.backNumber) {
                    case 1:
                        name = 'Simon'
                        backNumber = 23
                        break
                    case 2:
                        name = 'Carvajal'
                        backNumber = 2
                        break
                    case 3:
                        name = 'Cucurella'
                        backNumber = 24
                        break
                    case 4:
                        name = 'Laporte'
                        backNumber = 14
                        break
                    case 5:
                        name = 'Normand'
                        backNumber = 3
                        break
                    case 6:
                        name = 'Rodri'
                        backNumber = 16
                        break
                    case 7:
                        name = 'Nico'
                        backNumber = 17
                        break
                    case 8:
                        name = 'Ruiz'
                        backNumber = 8
                        break
                    case 9:
                        name = 'Morata'
                        backNumber = 7
                        break
                    case 10:
                        name = 'Olmo'
                        backNumber = 10
                        break
                    case 11:
                        name = 'Yamal'
                        backNumber = 19
                        break
                }
                break;

            case 'Germany':
                switch (p.backNumber) {
                    case 1:
                        name = 'Neuer'
                        backNumber = 1
                        break
                    case 2:
                        name = 'Mittelstädt'
                        backNumber = 18
                        break
                    case 3:
                        name = 'Kimmich'
                        backNumber = 6
                        break
                    case 4:
                        name = 'Rüdiger'
                        backNumber = 2
                        break
                    case 5:
                        name = 'Raum'
                        backNumber = 3
                        break
                    case 6:
                        name = 'Andrich'
                        backNumber = 23
                        break
                    case 7:
                        name = 'Musiala'
                        backNumber = 10
                        break
                    case 8:
                        name = 'Kroos'
                        backNumber = 8
                        break
                    case 9:
                        name = 'Havertz'
                        backNumber = 7
                        break
                    case 10:
                        name = 'Gündoğan'
                        backNumber = 21
                        break
                    case 11:
                        name = 'Wirtz'
                        backNumber = 17
                        break
                }
                break;

            case 'England':
                switch (p.backNumber) {
                    case 1:
                        name = 'Pickford'
                        backNumber = 1
                        break
                    case 2:
                        name = 'Walker'
                        backNumber = 2
                        break
                    case 3:
                        name = 'Shaw'
                        backNumber = 3
                        break
                    case 4:
                        name = 'Stones'
                        backNumber = 5
                        break
                    case 5:
                        name = 'Guehi'
                        backNumber = 6
                        break
                    case 6:
                        name = 'Mainoo'
                        backNumber = 26
                        break
                    case 7:
                        name = 'Foden'
                        backNumber = 11
                        break
                    case 8:
                        name = 'Rice'
                        backNumber = 4
                        break
                    case 9:
                        name = 'Kane'
                        backNumber = 9
                        break
                    case 10:
                        name = 'Bellingham'
                        backNumber = 10
                        break
                    case 11:
                        name = 'Saka'
                        backNumber = 7
                        break
                }
                break;
        }
        return { left: p.left, top: p.top, backNumber: backNumber, name: name, position: p.position, team: p.team };
    })
}

export type TeamInfo = {
    players: { left: number, top: number, backNumber: number, position: PlayerPositionEnum, team: 'HOME' | 'AWAY' }[]
    country: TeamCountry
}

export enum TeamCountry {
    SPAIN = "Spain",
    GERMANY = "Germany",
    ENGLAND = "England"
}
