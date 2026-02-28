resource "datadog_synthetics_test" "homepage" {
  name   = "Homepage — smoke test"
  type   = "browser"
  status = "live"

  request_definition {
    method = "GET"
    url    = var.site_url
  }

  browser_step {
    name = "Navigate to homepage"
    type = "goToUrl"
    params {
      value = var.site_url
    }
  }

  browser_step {
    name = "Assert header nav exists"
    type = "assertElementPresent"
    params {
      element = jsonencode({
        css     = "header nav"
        tagName = "NAV"
        userLocator = {
          failTestOnCannotLocate = true
          values = [
            { type = "css", value = "header nav" }
          ]
        }
      })
    }
  }

  browser_step {
    name = "Assert stream nav link exists"
    type = "assertElementPresent"
    params {
      element = jsonencode({
        css     = "a[href='/stream']"
        tagName = "A"
        userLocator = {
          failTestOnCannotLocate = true
          values = [
            { type = "css", value = "a[href='/stream']" }
          ]
        }
      })
    }
  }

  browser_variable {
    type    = "text"
    name    = "SITE_URL"
    example = var.site_url
    pattern = var.site_url
  }

  locations = ["aws:us-east-1"]

  options_list {
    tick_every            = 3600
    screenshot_on_failure = true
  }

  tags = ["site:alexrosenkranz", "env:production"]
}
