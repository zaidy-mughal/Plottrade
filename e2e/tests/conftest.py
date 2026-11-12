import os

import pytest
from selenium import webdriver


@pytest.fixture(scope="function")
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    if os.environ.get("E2E_HEADED") != "1":
        options.add_argument("--headless=new")

    driver = webdriver.Chrome(options=options)

    yield driver
    driver.quit()