resource "datadog_synthetics_test" "spotify_api" {
  name    = "Spotify API — now-playing endpoint"
  type    = "api"
  subtype = "http"
  status  = "live"

  request_definition {
    method = "GET"
    url    = "${var.site_url}/api/spotify/now-playing"
  }

  assertion {
    type     = "statusCode"
    operator = "is"
    target   = "200"
  }

  assertion {
    type     = "responseTime"
    operator = "lessThan"
    target   = "5000"
  }

  assertion {
    type     = "header"
    property = "content-type"
    operator = "contains"
    target   = "application/json"
  }

  locations = ["aws:us-east-1"]

  options_list {
    tick_every = 900
  }

  tags = ["site:alexrosenkranz", "env:production"]
}
