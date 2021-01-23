# Pokemon Game Api

This is a practice project that simulates an REST API for a classic GameBoy Pokemon Game. It uses [pokeapi.co](https://pokeapi.co/) as data source.

## How to run

```
npm install
npm run dev
```

## API

### Players

**Model**

```
{
    name: String,
    gender: String // ['F', 'M'],
    pokemons: {
        all: [
            Pokemon,
            ...
        ],
        carrying: [
            Pokemon,
            ...
        ],
    }
}
```

#### `GET /players`

Return all the players

**Response**

```
[
    Player,
    ...
]
```

#### `GET /player/:id`

Returns a player by a given ID

| Param | Type | Value Type | Description |
| ----- | ---- | ---------- | ----------- |
| id    | path | int        | Player ID   |

**Response**

```
Player
```

#### `POST /player`

Creates a new player

**Body**

```
{
    name: String,
    gender: String // ['F', 'M']
}
```

#### `PUT /player/:id`

Modifies a player data

| Param | Type | Value Type | Description |
| ----- | ---- | ---------- | ----------- |
| id    | path | int        | Player ID   |

**Body**

```
{
    name: String,
    gender: String // ['F', 'M']
}
```

#### `DELETE /player/:id`

Deletes a player by a given ID

| Param | Type | Value Type | Description |
| ----- | ---- | ---------- | ----------- |
| id    | path | int        | Player ID   |

#### `POST /player/:id/pokemons/:identifier`

Adds a new Pokemon to a Player

| Param      | Type | Value Type | Description                   |
| ---------- | ---- | ---------- | ----------------------------- |
| id         | path | int        | Player ID                     |
| identifier | path | String     | Pokemon name of Pokedex index |

#### `POST /player/:id/pokemons/:pokemonId/withdraw`

Adds a Pokemon from a player collection to its carrying collection

| Param     | Type | Value Type | Description   |
| --------- | ---- | ---------- | ------------- |
| id        | path | int        | Player ID     |
| pokemonId | path | String     | Pokedex Index |

#### `POST /player/:id/pokemons/:pokemonId/deposit`

Removes a Pokemon from a player's carrying collection

| Param     | Type | Value Type | Description |
| --------- | ---- | ---------- | ----------- |
| id        | path | int        | Player ID   |
| pokemonId | path | String     | Pokemon ID  |

---

### Pokemons

#### `GET /pokemon/:identifier`

Returns a Pokemon by its name or Pokedex index

| Param      | Type | Value Type | Description                   |
| ---------- | ---- | ---------- | ----------------------------- |
| identifier | path | String     | Pokemon name or Pokedex index |
