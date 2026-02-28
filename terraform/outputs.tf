output "homepage_test_id" {
  description = "Public ID of the homepage Synthetics test"
  value       = datadog_synthetics_test.homepage.id
}

output "theme_toggle_test_id" {
  description = "Public ID of the theme toggle Synthetics test"
  value       = datadog_synthetics_test.theme_toggle.id
}

output "spotify_api_test_id" {
  description = "Public ID of the Spotify API Synthetics test"
  value       = datadog_synthetics_test.spotify_api.id
}

output "stream_filter_test_id" {
  description = "Public ID of the stream filter Synthetics test"
  value       = datadog_synthetics_test.stream_filter.id
}
