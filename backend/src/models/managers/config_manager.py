from src.utils.singleton import Singleton


class ConfigManager(metaclass=Singleton):
    def __init__(self, config=None, system_path=None):
        if config:
            self.config = config
        if system_path:
            self.system_path = system_path
