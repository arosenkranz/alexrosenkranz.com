resource "datadog_synthetics_test" "theme_toggle" {
  name   = "Theme toggle — dark/light switch"
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
    name = "Click theme toggle button"
    type = "click"
    params {
      element = jsonencode({
        css     = "#theme-toggle"
        tagName = "BUTTON"
        userLocator = {
          failTestOnCannotLocate = true
          values = [
            { type = "css", value = "#theme-toggle" }
          ]
        }
      })
    }
  }

  browser_step {
    name = "Assert html element has dark class"
    type = "assertElementAttribute"
    params {
      element = jsonencode({
        css     = "html"
        tagName = "HTML"
        userLocator = {
          failTestOnCannotLocate = true
          values = [
            { type = "css", value = "html" }
          ]
        }
      })
      attribute = "class"
      value     = "dark"
      check     = "contains"
    }
  }

  device_ids = ["chrome.laptop_large"]

  locations = ["aws:us-east-1"]

  options_list {
    tick_every = 3600
  }

  tags = ["site:alexrosenkranz", "env:production"]
}
