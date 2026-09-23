import pytest
from selenium import webdriver


@pytest.fixture(scope="function")
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    # options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    yield driver
    driver.quit()