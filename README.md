# mars-ia-atelier2-toulouse
La plateforme marsAI est le support numérique officiel du festival marsAI, concours international de courts-métrages générés par intelligence artificielle.

## Arborescence
/back
/front
README.md


## EntityDiagram
```mermaid
erDiagram


User {
  int id 
}

Film {
  int id
  int user_id
}

Sponsor {
  int id
}

Prix {
  int id
  int film_id
  int sponsor_id
}

Workshop {
  int id
  int user_id
  int category_id
}

WorkshopCategory {
  int id
}

Playlist {
  int id
  int user_id
}

Selection {
  int id
  int user_id
}

Notification {
  int id
  int user_id
  int workshop_id
  int film_id
  int prix_id
}

File {
  int id
  int film_id
}

PlaylistFilm {
  int id
  int playlist_id
  int film_id
}

SelectionFilm {
  int id
  int selection_id
  int film_id
}

FilmSponsor {
  int id
  int film_id
  int sponsor_id
}

User ||--o{ Film : candidate
User ||--o{Playlist : has
User }o--o{Film:Comment
User }o--o{Film:annotation
User }o--o{Workshop:sub
User ||--o{Notification: received

Film }o--||Selection:select
Film||--||File:dubbed(url)
Film||--||File:posted
Film||--||File:subtitled
Film}o--o{Playlist:select
Film||--o{Prix:won

Prix}o--o{Sponsor:support
Pris}o--||Selection:belong
sponsor}o--o|Selection:support

workshop}o--o|Notification:recieve
workshop}o--|{{workshopcategory:has
workshop}o--o{Sponsor:support


























```