import yaml

from sync import flatten


def test_flatten():
    dictionary = yaml.safe_load("""
A:
- A. option A:
    AA:
    - AA. option A:
        AAA:
    """)

    assert flatten(dictionary) == [

    ]