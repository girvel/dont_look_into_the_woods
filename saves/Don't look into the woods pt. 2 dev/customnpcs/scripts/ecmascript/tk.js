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

function findFactionByName(event, name) {
    var factions = event.API.getFactions().list();
    for (var i = 0; i < factions.size(); i++) {
        var faction = factions[i];

        if (faction.getName() == name) return faction;
    }

    return null;
}

function findDialogByName(event, name) {
    var categories = event.API.getDialogs().categories();
    for (var i = 0; i < categories.size(); i++) {

        var dialogs = categories[i].dialogs();
        for (var j = 0; j < dialogs.size(); j++) {

            if (dialogs[j].getName() == name) {
                return dialogs[j];
            }
        }
    }

    return null;
}

function findPlayer(event) {

    var worlds = event.API.getIWorlds();
    for (var i = 0; i < worlds.length; i++) {

        var players = worlds[i].getAllPlayers();
        if (players.length > 0) return players[0];
    }
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
            if (findPlayer(event, event).hasReadDialog(
                findDialogByName(event, this._dialog).getId()
            )) return;

            event.npc.getAi().setMovingType(0);
            event.npc.getAi().setAnimation(this._animation);
            event.npc.setHome(this._from[0], this._from[1], this._from[2]);
        },

        dialogClose: function(event) {
            if (event.dialog.getName() == this._dialog) {
                this.move(event);
            }
        },

        tick: function(event) {
            if (event.npc.getAi().getMovingType() == 2 && 
                event.npc.getPos().distanceTo(
                    event.API.getIPos(this._to[0], this._to[1], this._to[2])
                ) <= 3
            ) {
                event.npc.getAi().setMovingType(0);
                event.npc.getAi().setAnimation(0);
                event.npc.setHome(this._to[0], this._to[1], this._to[2]);
            }
        },

        move: function(event) {
            event.npc.getAi().setMovingType(2);
        }
    };
}

function setEnchantment(item, id, level) {
    item.removeEnchant(id);
    item.addEnchantment(id, level);
}

function isUnderCeiling(world, pos, height) {
    for (var h = 1; h <= height; h++) {
        if (!world.getBlock(pos.getX(), pos.getY() + h, pos.getZ()).isAir()) {
            return true;
        }
    }

    return false;
}