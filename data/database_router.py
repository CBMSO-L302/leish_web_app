class LeishmaniaRouter:
    def db_for_read(self, model, **hints):
        """Point queries for the `Infantum` model to the `leishmania` database."""
        if model._meta.app_label == 'species':
            return 'leishmania'
        return None

    def db_for_write(self, model, **hints):
        """Point write operations for the `Infantum` model to the `leishmania` database."""
        if model._meta.app_label == 'species':
            return 'leishmania'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Prevent migrations on the `leishmania` database."""
        if db == 'leishmania':
            return False  # Disables migrations for leishmania
        return None
