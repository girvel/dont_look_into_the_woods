import logging
import os
import subprocess
from logging import getLogger
from pathlib import Path
from urllib.request import urlretrieve

from fire import Fire
from rich.prompt import Prompt

log = getLogger(__name__)
logging.basicConfig()


class Cli:
    """Installs "Don't look into the woods" """
    def __call__(self, *, debug=False):
        log.setLevel(debug and "DEBUG" or "ERROR")
        os.chdir(Path(__file__).parent.parent)

        files_to_install = [
            Path(line[1:])
            for line in Path('.gitignore').read_text().split('\n')
            if line.startswith('!')
        ]
        log.info(f"Installing files: {files_to_install}")

        install_launcher = Prompt.ask(
            "Хотите установить лаунчер майнрафта? (Официальный лаунчер не "
            "рекомендован)",
            choices=["Да", "Нет"],
            default="Да",
        )

        if install_launcher:
            log.info("Downloading TL Legacy")
            urlretrieve(
                "https://tlaun.ch/installer", "tlauncher_installer.exe"
            )

            log.info("Installing TL Legacy")
            subprocess.run(["tlauncher_installer.exe"])

if __name__ == '__main__':
    Fire(Cli())
