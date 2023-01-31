#!/usr/bin/env py.exe -3.10
import json
from pathlib import Path

import yaml
from fire import Fire


# own_assets_dir = Path("saves/Don't look into the woods pt. 2 dev/assets/sync")
# dialogs_dir = Path(
#     "saves/Don't look into the woods pt. 2 dev/customnpcs/dialogs"
# )
#
#
# class Defaults:
#     dialogue = (own_assets_dir / "dialogue.json").read_text()
#     option = (own_assets_dir / "option.json").read_text()
#
#
# def flatten(dialog_tree, counter):
#     pieces = []
#     for line, responses in dialog_tree:
#         pieces += [line, {
#             "id": counter - 1,
#             "option"
#         }]
#     return counter, pieces
#
#
# def find_max_id(directory):
#     return max(
#         int(file.stem)
#         for subdirectory in directory.iterdir()
#         for file in subdirectory.iterdir()
#         if file.is_file() and file.name.suffix == "json"
#     )
#
#
# class Cli:
#     def __call__(self, directory="assets/dialogs"):
#         directory = Path(directory)
#         # counter = find_max_id(Path("customnpcs/dialogs")) + 1
#         counter = 1
#
#         for character in directory.iterdir():
#             dialog_tree = yaml.safe_load(character.read_text())
#             counter, pieces = flatten(dialog_tree, counter)
#
#             for line, options in pieces:
#                 piece_path = (dialogs_dir / character.stem)
#                 piece_path.mkdir(exist_ok=True)
#                 piece_path.write_text(Defaults.dialogue.format(
#                     id=json.dumps(counter),
#                     title=json.dumps(line[:20]),
#                     dialog_text=json.dumps(line),
#                     options=",\n".join(Defaults.option.format(
#                         **option
#                     ) for option in options)
#                 ))
#
#
#
# if __name__ == '__main__':
#     Fire(Cli())