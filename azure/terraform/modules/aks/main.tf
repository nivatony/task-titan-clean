# modules/aks/main.tf
resource "azurerm_kubernetes_cluster" "aks_cluster" {
  name                = var.aks_name
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.kubernetes_version
  enable_rbac         = true

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.vm_size
    os_type    = "Linux"
    vnet_subnet_id = azurerm_subnet.private_subnet_1.id
  }

  tags = var.tags
}

