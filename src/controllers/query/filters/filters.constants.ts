import { DataSource } from "typeorm";
import { MoviesHigherBudget, MoviesHigherDuration, MoviesHigherRevenue, MoviesLowerBudget, MoviesLowerDuration, MoviesLowerRevenue } from "./movies.filters";
import { EditorsCharactersVolumes, EditorsVolumesWritten, EditorsCountry } from "./editors.filters";
import { CharactersMoviesAppearances } from "./characters.filters";
import { PowersCharactersOccurrences } from "./powers.filters";
import { VolumesIssues } from "./volumes.filters";
import { Response } from "../query.interface"


export const FiltersMap: Readonly<{ [x: string]: ((connection: DataSource) => Promise<Response>) }> = {
    1: CharactersMoviesAppearances,
    // 2: null,
    3: MoviesHigherBudget,
    4: MoviesLowerBudget,
    5: MoviesHigherRevenue,
    6: MoviesLowerRevenue,
    7: MoviesHigherDuration,
    8: MoviesLowerDuration,
    9: PowersCharactersOccurrences,
    10: VolumesIssues,
    11: EditorsVolumesWritten,
    12: EditorsCharactersVolumes,
    13: EditorsCountry
};