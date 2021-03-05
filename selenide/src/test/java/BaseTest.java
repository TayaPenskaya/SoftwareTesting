import com.codeborne.selenide.Configuration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.WebDriverRunner.*;
import static org.junit.jupiter.api.Assertions.fail;

abstract class BaseTest {
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