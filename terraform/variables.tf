variable "datadog_api_key" {
  description = "Datadog API key"
  type        = string
  sensitive   = true
}

variable "datadog_app_key" {
  description = "Datadog Application key"
  type        = string
  sensitive   = true
}

variable "site_url" {
  description = "Base URL of the site under test"
  type        = string
  default     = "https://alexrosenkranz.com"
}
