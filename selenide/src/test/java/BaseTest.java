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
            open("http://127.0.0.1:3001/");
        } else {
            System.err.println(url);
            open(url);
        }
    }

    @Test
    public void success_login() {
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

    @Test
    public void fail_login() {
        $("#login-id").setValue("taya");
        $("#password-id").setValue("loh");
        $("#submit-id").click();
        sleep(2000);
        switch (driver().url()) {
            case "http://127.0.0.1:3001/error":
                break;
            case "http://127.0.0.1:3001/":
                fail("Server tormoz");
            default:
                fail("Сам ты лох!");
        }
    }

    @Test
    public void registration_after_login() {
        $("#register-id").click();
        sleep(2000);
        switch (driver().url()) {
            case "http://127.0.0.1:3001/users/register":
                break;
            case "http://127.0.0.1:3001/":
                fail("Server tormoz");
            default:
                fail("Промахнулся");
        }
    }
}