import csv
import pytest
from pages.registration_page import RegistrationPage

def get_test_data():
    with open("test_data/users.csv", "r") as f:
        reader = csv.DictReader(f)
        return [row for row in reader]

@pytest.mark.parametrize("user", get_test_data())
def test_user_registration(driver, user):
    reg_page = RegistrationPage(driver)
    reg_page.load()
    
    reg_page.select_role(user["role"])
    reg_page.fill_form(user["username"], user["email"], user["password"])
    reg_page.submit()
    
    # Verify redirection to sign-in page upon successful registration
    assert "sign-in" in driver.current_url