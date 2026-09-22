from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    URL = "http://localhost:5173/sign-in"
    
    BUYER_BTN = (By.XPATH, "//button[contains(text(), 'Buyer')]")
    SELLER_BTN = (By.XPATH, "//button[contains(text(), 'Seller')]")
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    SIGN_IN_BTN = (By.XPATH, "//button[contains(text(), 'Sign In')]")

    def load(self):
        self.driver.get(self.URL)

    def select_role(self, role):
        if role.lower() == "buyer":
            self.click(*self.BUYER_BTN)
        elif role.lower() == "seller":
            self.click(*self.SELLER_BTN)

    def login(self, email, password):
        self.enter_text(*self.EMAIL_INPUT, email)
        self.enter_text(*self.PASSWORD_INPUT, password)
        self.click(*self.SIGN_IN_BTN)