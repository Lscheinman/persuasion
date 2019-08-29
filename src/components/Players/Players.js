import React from 'react';
import Player from "./Player/Player";

const players = (props) => props.players.map((player) => {
    return <Player
        key={player.id}
        click={(event) => props.clicked(event, player.name)}
        icon={player.icon}
        group={player.group}
        score={player.score}
        name={player.name}
        changed={(event) => props.changed(event, player.id)}
    />
});

export default players;