function debug(event, text) {
    var target = event.npc || event.block || event.player;

    event.API.executeCommand(target.getWorld(), "/say " + text);
}

function colorMultiplication(r, g, b, k) {
    return Math.floor(r * k) * 0x010000 
        + Math.floor(g * k) * 0x000100 
        + Math.floor(b * k);
}

function say(event, message) {
    event.API.executeCommand(
        event.player.getWorld(), 
        '/tellraw @p {"text": "' + message + '", "color": "dark_purple"}'
    );
}

function iposEqual(p1, p2) {
    return (
        p1.getX() === p2.getX() && 
        p1.getY() === p2.getY() && 
        p1.getZ() === p2.getZ()
    );
}

function create_navigator(from, to) {
    return {
        _from: from,
        _to: to,
        _animation: 0,
        _dialog: undefined,

        animation: function(value) {
            this._animation = value;
            return this;
        },

        dialog: function(value) {
            this._dialog = value;
            return this;
        },

        init: function(event) {
            event.npc.getAi().setMovingType(0);
            event.npc.getAi().setAnimation(this._animation);
            event.npc.setHome(this._from[0], this._from[1], this._from[2]);
        },

        dialogClose: function(event) {
            if (event.dialog.getName() == this._dialog) {
                this.move(event);
            }
        },

        move: function(event) {
            event.npc.getAi().setMovingType(2);
        },

        tick: function(event) {
            if (event.npc.getAi().getMovingType() == 2 && 
                event.npc.getPos().distanceTo(
                    event.API.getIPos(this._to[0], this._to[1], this._to[2])
                ) <= 3
            ) {
                event.npc.getAi().setMovingType(0)
                event.npc.getAi().setAnimation(0)
                event.npc.setHome(this._to[0], this._to[1], this._to[2])
            }
        }
    };
}