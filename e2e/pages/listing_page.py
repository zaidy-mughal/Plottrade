import os
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from pages.base_page import BasePage

class ListingPage(BasePage):
    PROFILE_URL = "http://localhost:5173/profile"
    
    # Locators
    MY_LISTINGS_LINK = (By.XPATH, "//a[contains(text(), 'My Listings')]")
    CREATE_LISTING_LINK = (By.XPATH, "//a[contains(., 'Create New Listing')]")
    
    # Form Locators
    NAME_INPUT = (By.ID, "name")
    DESC_INPUT = (By.ID, "description")
    ADDRESS_INPUT = (By.ID, "address")
    TYPE_SALE = (By.ID, "sale")
    PRICE_INPUT = (By.ID, "regularPrice")
    IMAGE_UPLOAD = (By.ID, "images")
    UPLOAD_BTN = (By.XPATH, "//button[contains(text(), 'Upload')]")
    SUBMIT_LISTING_BTN = (By.XPATH, "//button[contains(text(), 'Create listing')]")
    IMAGE_THUMBNAIL = (By.XPATH, "//img[@alt='listing image']")

    def navigate_to_create_listing(self):
        self.driver.get(self.PROFILE_URL)
        self.click(*self.MY_LISTINGS_LINK)
        self.click(*self.CREATE_LISTING_LINK)

    def fill_listing_details(self, name, description, address, price):
        self.enter_text(*self.NAME_INPUT, name)
        self.enter_text(*self.DESC_INPUT, description)
        self.enter_text(*self.ADDRESS_INPUT, address)
        self.click(*self.TYPE_SALE)
        self.enter_text(*self.PRICE_INPUT, price)

    def upload_images_and_submit(self, file_paths):
        # Convert relative paths to absolute paths for Selenium
        abs_paths = "\n".join([os.path.abspath(p) for p in file_paths])
        
        # Send paths to the hidden file input
        file_input = self.wait.until(EC.presence_of_element_located(self.IMAGE_UPLOAD))
        file_input.send_keys(abs_paths)
        
        # Click upload and wait for the image thumbnail to render from Cloudinary
        self.click(*self.UPLOAD_BTN)
        self.wait.until(EC.visibility_of_element_located(self.IMAGE_THUMBNAIL))
        
        self.click(*self.SUBMIT_LISTING_BTN)