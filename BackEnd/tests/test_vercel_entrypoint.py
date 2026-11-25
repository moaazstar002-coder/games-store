import os
import subprocess
import sys
import unittest
from pathlib import Path


class TestVercelEntrypoint(unittest.TestCase):
    def test_exports_fastapi_app_with_documentation_and_api_routes(self):
        backend_dir = Path(__file__).resolve().parents[1]
        environment = os.environ.copy()
        environment.update(
            {
                "DATABASE_URL": "sqlite:///:memory:",
                "SECRET_KEY": "entrypoint-test-only",
                "FRONTEND_ORIGINS": "https://games-store-plum.vercel.app",
            }
        )
        verification = (
            "from fastapi import FastAPI; "
            "from main import app; "
            "assert isinstance(app, FastAPI); "
            "assert app.docs_url == '/docs'; "
            "assert app.openapi_url == '/openapi.json'; "
            "paths = app.openapi()['paths']; "
            "assert '/api/v1/games' in paths; "
            "assert '/api/v1/genres' in paths"
        )

        result = subprocess.run(
            [sys.executable, "-c", verification],
            cwd=backend_dir,
            env=environment,
            capture_output=True,
            text=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
