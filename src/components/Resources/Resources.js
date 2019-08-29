import React from 'react';
import Resource from "./Resource/Resource";

const resources = (props) => props.resources
    .map((resource, index) => {
        return <Resource
            key={resource.id}
            click={() => props.clicked(index)}
            name={resource.name}
            ascope={resource.ascope}
            crimefilled={resource.crimefilled}
            offence={resource.offence}
            defence={resource.defence}
            type={resource.type}
            category={resource.category}
            score={resource.points}
            title={resource.title}
            xpos={resource.xpos}
            ypos={resource.ypos}
            zpos={resource.zpos}
            hitpoints={resource.hitpoints}
            player={resource.player}
            icon={resource.icon}
            speed={resource.speed}
            changed={(event) => props.changed(event, resource.id)}
        />
    });

export default resources;