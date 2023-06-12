import {
    MoviesLoader,
    VolumesLoader,
    EditorsLoader,
    SuperPowerLoader,
    CharactersLoader,
    EditorsVolumesLoader,
    MoviesCharactersLoader,
    CharactersPowersLoader,
    EditorsCharactersLoader
} from "@loaders";

export const LoadersRunner = (async () => {
    const START_LOADERS = process.env.START_LOADERS === 'true' ? true : false;

    if (!START_LOADERS) return null;

    console.log({ method: 'LoadersRunner', message: 'Starting Loaders' });

    // Primary Tables
    await CharactersLoader();
    await SuperPowerLoader();
    await EditorsLoader();
    await VolumesLoader();
    await MoviesLoader();

    // Relational Tables
    await CharactersPowersLoader();
    await EditorsCharactersLoader();
    await MoviesCharactersLoader();
    await EditorsVolumesLoader();
});