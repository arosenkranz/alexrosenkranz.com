terraform {
  required_version = ">= 1.5"

  required_providers {
    datadog = {
      source  = "DataDog/datadog"
      version = "~> 3.0"
    }
  }

  cloud {
    organization = "alexrosenkranz"

    workspaces {
      name = "alexrosenkranz-synthetics"
    }
  }
}

provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
  api_url = "https://api.datadoghq.com/"
}
