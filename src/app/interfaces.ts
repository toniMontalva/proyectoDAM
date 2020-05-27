export interface ITeam {
    "id": number,
    "name": string,
    "pic": string
}

export interface IMatch {
    "id": number,
    "awayTeam": string,
    "picAwayTeam": string,
    "homeTeam": string,
    "picHomeTeam": string,
    "league": string,
    "time": string,
    "fav": boolean
}

export interface ICompetition {
    "id": number,
    "name" : string,
    "flag": string
}