resource "datadog_synthetics_test" "stream_filter" {
  name   = "Stream — tag filter and post detail navigation"
  type   = "browser"
  status = "live"

  request_definition {
    method = "GET"
    url    = "${var.site_url}/stream"
  }

  browser_step {
    name = "Navigate to stream"
    type = "goToUrl"
    params {
      value = "${var.site_url}/stream"
    }
  }

  browser_step {
    name = "Click first tag filter link"
    type = "click"
    params {
      element = jsonencode({
        css     = "a[href*='?tag=']:first-of-type"
        tagName = "A"
        userLocator = {
          failTestOnCannotLocate = true
          values = [
            { type = "css", value = "a[href*='?tag=']:first-of-type" }
          ]
        }
      })
    }
  }

  browser_step {
    name = "Assert URL contains tag param"
    type = "assertCurrentUrl"
    params {
      check = "contains"
      value = "?tag="
    }
  }

  browser_step {
    name = "Click first visible post card"
    type = "click"
    params {
      element = jsonencode({
        css     = "article a:first-of-type"
        tagName = "A"
        userLocator = {
          failTestOnCannotLocate = true
          values = [
            { type = "css", value = "article a:first-of-type" }
          ]
        }
      })
    }
  }

  browser_step {
    name = "Assert URL matches /posts/"
    type = "assertCurrentUrl"
    params {
      check = "contains"
      value = "/posts/"
    }
  }

  device_ids = ["chrome.laptop_large"]

  locations = ["aws:us-east-1"]

  options_list {
    tick_every = 3600
  }

  tags = ["site:alexrosenkranz", "env:production"]
}
