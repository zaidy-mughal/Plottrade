from pages.login_page import LoginPage
from pages.listing_page import ListingPage
from selenium.webdriver.support import expected_conditions as EC

def test_seller_can_create_listing(driver, tmp_path):
    # 1. Setup: Create a dummy image file for the upload test
    dummy_image = tmp_path / "test_property.jpg"
    dummy_image.write_bytes(b"fake image content")

    # 2. Authenticate as Seller
    login_page = LoginPage(driver)
    login_page.load()
    login_page.select_role("seller")
    login_page.login("seller1@plottrade.com", "TestPass123!")
    login_page.wait.until(EC.url_to_be("http://localhost:5173/"))

    # 3. Create Listing Workflow
    listing_page = ListingPage(driver)
    listing_page.navigate_to_create_listing()
    
    listing_page.fill_listing_details(
        name="Luxury Downtown Penthouse",
        description="Spacious penthouse with skyline views and premium amenities.",
        address="123 Main St, Metro City",
        price="500000"
    )
    
    listing_page.upload_images_and_submit([str(dummy_image)])
    
    # 4. Verify successful creation (redirects to /listing/:id)
    listing_page.wait.until(EC.url_contains("/listing/"))
    assert "/listing/" in driver.current_url