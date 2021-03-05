import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import static com.codeborne.selenide.Condition.cssClass;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.WebDriverRunner.*;
import static org.junit.jupiter.api.Assertions.fail;

abstract class BaseTest {
    private final static String CSS_CLASS_BUTTON_DISABLED = "buttonDisabled";

    private final static String SELECTOR_TOP_PANEL = "#root > div > div.topPanel";
    private final static String SELECTOR_FLOOR_SWITCHER = "#root > div > div.officeMap > div.omTopPanel > div.floorSwitcher";
    private final static String SELECTOR_FLOOR_TITLE = "#root > div > div.officeMap > div.omTopPanel > div.floorTitle";

    private final String url;

    protected BaseTest(String url) {
        this.url = url;
    }

    @BeforeEach
    public void setUp() {
        Configuration.fastSetValue = false;
        if (hasWebDriverStarted()) {
            clearBrowserCookies();
            clearBrowserLocalStorage();
            refresh();
        } else {
            System.err.println(url);
            open(url);
        }
    }

    @Test
    public void login() {
        $("#login-id").setValue("taya");
        $("#password-id").setValue("taya");
        $("#submit-id").click();
        sleep(2000);
        switch (driver().url()) {
            case "http://127.0.0.1:3001/tables":
                break;
            case "http://127.0.0.1:3001/":
                fail("Server tormoz");
            case "http://127.0.0.1:3001/error":
                fail("Ты не смог зарегаться, лох!");
            default:
                fail("Server loh");
        }
    }
}