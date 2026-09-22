from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class RegistrationPage(BasePage):
    URL = "http://localhost:5173/sign-up"
    
    BUYER_BTN = (By.XPATH, "//button[contains(text(), 'Buyer')]")
    SELLER_BTN = (By.XPATH, "//button[contains(text(), 'Seller')]")
    USERNAME_INPUT = (By.ID, "username")
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    SIGN_UP_BTN = (By.XPATH, "//button[contains(text(), 'Sign Up')]")

    def load(self):
        self.driver.get(self.URL)

    def select_role(self, role):
        if role.lower() == "buyer":
            self.click(*self.BUYER_BTN)
        elif role.lower() == "seller":
            self.click(*self.SELLER_BTN)

    def fill_form(self, username, email, password):
        self.enter_text(*self.USERNAME_INPUT, username)
        self.enter_text(*self.EMAIL_INPUT, email)
        self.enter_text(*self.PASSWORD_INPUT, password)

    def submit(self):
        self.click(*self.SIGN_UP_BTN)