import csv
import pytest
from selenium.webdriver.support import expected_conditions as EC
from pages.login_page import LoginPage

def get_test_data():
    with open("test_data/users.csv", "r") as f:
        reader = csv.DictReader(f)
        return [row for row in reader]

@pytest.mark.parametrize("user", get_test_data())
def test_user_login(driver, user):
    login_page = LoginPage(driver)
    login_page.load()
    
    login_page.select_role(user["role"])
    login_page.login(user["email"], user["password"])
    
    # Wait for the redirection to home ("/") route
    login_page.wait.until(EC.url_to_be("http://localhost:5173/"))
    assert driver.current_url == "http://localhost:5173/"