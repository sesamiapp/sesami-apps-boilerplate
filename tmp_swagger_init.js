
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/shops": {
        "get": {
          "operationId": "ShopController_get",
          "summary": "Retrieve list of your shops",
          "description": "",
          "parameters": [
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationShopItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shops/{shop}/configs": {
        "get": {
          "operationId": "ShopController_getShopConfig",
          "summary": "Retrieve your shop's config",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadShopConfigResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "config",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shops/{id}": {
        "get": {
          "operationId": "ShopController_getById",
          "summary": "Retrieve a specific shop",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadShopResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "ShopController_update",
          "summary": "Update a shop",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateShopRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadShopResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/services": {
        "get": {
          "operationId": "ServiceController_get",
          "summary": "Retrieve list of your services",
          "description": "",
          "parameters": [
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationServiceItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "service",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Services"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/services/{id}": {
        "get": {
          "operationId": "ServiceController_getById",
          "summary": "Retrieve a specific service",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadServiceResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "service",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Services"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "ServiceController_update",
          "summary": "Update a service",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateServiceRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadServiceResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "service",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Services"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ServiceController_delete",
          "summary": "Remove a service",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EmptyResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "service",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Services"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/flows": {
        "get": {
          "operationId": "FlowController_get",
          "summary": "Retrieve list of your shop's flows",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationFlowItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Flows"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "FlowController_create",
          "summary": "Create new flow",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateFlowRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Request successful and item created"
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Flows"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/flows/{id}": {
        "get": {
          "operationId": "FlowController_getById",
          "summary": "Retrieve a specific flow",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadFlowResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | flow",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Flows"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "FlowController_update",
          "summary": "Update a flow",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateFlowRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadFlowResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Flows"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "FlowController_delete",
          "summary": "Delete a flow",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Request successful and item created"
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | flow",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Flows"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/{id}": {
        "get": {
          "operationId": "AppointmentController_getById",
          "summary": "Retrieve a specific appointment",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "timezone",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadAppointmentResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments": {
        "get": {
          "operationId": "AppointmentController_searchAppointments",
          "summary": "Retrieve list of appointments",
          "description": "This endpoint is for to retrieve list of appointments for a specific team member or in a specific range or for a specific type like: upcoming, past ,.etc",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "ids",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "teamMember",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": false,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": false,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "filterType",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "ALL",
                  "UPCOMING",
                  "PAST",
                  "RANGE"
                ],
                "type": "string"
              }
            },
            {
              "name": "resources",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "locationId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "timezone",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationAppointmentItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/report": {
        "post": {
          "operationId": "AppointmentController_generateReport",
          "summary": "Export list of appointments",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AppointmentGenerateReportQuery"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GenerateReportResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/{id}/cancel": {
        "post": {
          "operationId": "AppointmentController_cancel",
          "summary": "Cancel a specific appointment",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CancelAppointmentRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EmptyResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/{id}/no-show": {
        "post": {
          "operationId": "AppointmentController_noShow",
          "summary": "Update appointment status to no-show",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAppointmentEventRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadAppointmentResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/{id}/check-in": {
        "post": {
          "operationId": "AppointmentController_checkIn",
          "summary": "Update appointment status to check-in",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAppointmentEventRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadAppointmentResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/{id}/reschedule": {
        "post": {
          "operationId": "AppointmentController_reschedule",
          "summary": "Reschedule your appointment",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RescheduleAppointmentRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EmptyResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/appointments/{id}/resend-appointment-confirmation": {
        "post": {
          "operationId": "AppointmentController_resendAppointmentConfirmation",
          "summary": "Update appointment status to no-show",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadAppointmentResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | appointment",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Appointments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/calendar/events": {
        "post": {
          "operationId": "CalendarController_getSlots",
          "summary": "Retrieve you calendar events",
          "description": "This endpoints is to retrieve your calendar events such as: appointment, reservations, block times(like Google Calendar events).",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetCalendarBlockSlotsRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadCalendarBlockSlotsResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop | teamMember",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Calendar"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/reservations": {
        "get": {
          "operationId": "ReservationController_searchReservations",
          "summary": "Retrieve you reservations",
          "description": "This endpoint is for to retrieve list of reservations for a specific team member or in a specific range or for a specific type like: upcoming, past ,.etc",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "ids",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "teamMember",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": false,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": false,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "filterType",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "ALL",
                  "UPCOMING",
                  "PAST",
                  "RANGE"
                ],
                "type": "string"
              }
            },
            {
              "name": "resources",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "locationId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "timezone",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationReservationItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Reservations"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/reservations/{id}": {
        "get": {
          "operationId": "ReservationController_getById",
          "summary": "Retrieve  a specific reservations",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved."
            },
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadReservationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Reservations"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users": {
        "post": {
          "operationId": "UserController_create",
          "summary": "Create a new user for your store",
          "description": "",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Request successful and item created"
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users/me": {
        "get": {
          "operationId": "UserController_getUserInfo",
          "summary": "Retrieve your account information",
          "description": "",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadUserSelfResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "UserController_updateMe",
          "summary": "Update your account information such as firstname, lastname and .etc.",
          "description": "",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateMeRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadUserSelfResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users/login/password": {
        "post": {
          "operationId": "UserController_loginByPassword",
          "summary": "Login with your username and password",
          "description": "You can use this endpoint to retrieve an access token and refresh token.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginWithPasswordRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadTokenResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/users/{userId}/permissions/{shop}": {
        "patch": {
          "operationId": "UserController_managePermissions",
          "summary": "Manage user's  access levels",
          "description": "",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ManagePermissionsRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadUserResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users/{shop}": {
        "get": {
          "operationId": "UserController_search",
          "summary": "Retrieve shop's users",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationUserItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users/{id}": {
        "get": {
          "operationId": "UserController_getUser",
          "summary": "Retrieve a specific user",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadUserSelfResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/users/{id}/shop/{shop}": {
        "delete": {
          "operationId": "UserController_delete",
          "summary": "Remove a user from your store",
          "description": "",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadUserResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/availabilities/{shop}": {
        "get": {
          "operationId": "AvailabilityController_getAvailability",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "service",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "timezone",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "variantId",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "ids",
              "required": true,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {}
              }
            },
            {
              "name": "quantity",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "locationId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "default": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ReadAvailabilitySlotResponse"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Availabilities"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_getRefreshToken",
          "summary": "Retrieve a new refresh token",
          "description": "",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetRefreshTokenRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadTokenResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Authentication"
          ]
        }
      },
      "/auth/access-token": {
        "post": {
          "operationId": "AuthController_createToken",
          "summary": "To create an online token or a Personal Access Token(PAT)",
          "description": "",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccessTokenRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AccessTokenResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "user | shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/oauth/authorization": {
        "get": {
          "operationId": "OAuthController_appAuthentication",
          "summary": "Run an OAuth flow",
          "description": "This endpoint redirect the user to a consent page.",
          "parameters": [
            {
              "name": "clientId",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shopId",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "scopes",
              "required": true,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "redirectUri",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved."
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "OAuth"
          ]
        }
      },
      "/oauth/access-token": {
        "post": {
          "operationId": "OAuthController_getOfflineToken",
          "summary": "Retrieve an Offline token for your app",
          "description": "",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiKeyRestRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AccessTokenResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "app | shop",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "OAuth"
          ]
        }
      },
      "/{shop}/resources/{id}": {
        "get": {
          "operationId": "ResourceController_getResource",
          "summary": "Retrieve a specific resource",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "timezone",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadResourceResponseREST"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Resource"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "ResourceController_updateResource",
          "summary": "Update a specific resource",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateResourceRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadResourceResponseREST"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Resource"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ResourceController_deleteResource",
          "summary": "Delete a specific resource",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EmptyResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Resource"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/resources": {
        "post": {
          "operationId": "ResourceController_createResource",
          "summary": "Create a resource",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateResourceRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Request successful and item created"
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Resource"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ResourceController_getAllResources",
          "summary": "Retrieve list of your resources",
          "description": "",
          "parameters": [
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "typeId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "locationId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "timezone",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "ids",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationResourceItemResponseREST"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Resource"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/webhooks/{webhookId}": {
        "get": {
          "operationId": "WebhookController_getSubscriber",
          "parameters": [
            {
              "name": "webhookId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "topic",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "put": {
          "operationId": "WebhookController_updateSubscriber",
          "parameters": [
            {
              "name": "webhookId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "topic",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateSubscriberRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "delete": {
          "operationId": "WebhookController_deleteSubscriber",
          "parameters": [
            {
              "name": "webhookId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "topic",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/{shop}/webhooks/{webhookId}/bulk": {
        "delete": {
          "operationId": "WebhookController_bulkDeleteSubscribers",
          "parameters": [
            {
              "name": "webhookId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/{shop}/locations": {
        "post": {
          "operationId": "LocationController_createLocation",
          "summary": "Create a Location",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateLocationRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Request successful and item created"
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Location"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "LocationController_getAllLocations",
          "summary": "Retrieve list of your locations",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationLocationItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Location"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/locations/{id}": {
        "patch": {
          "operationId": "LocationController_updateLocation",
          "summary": "Update a specific location",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateLocationRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadLocationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Location"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "LocationController_deleteLocation",
          "summary": "Delete a specific location",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "locationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadLocationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Location"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "LocationController_getLocation",
          "summary": "Retrieve a specific location",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadLocationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "location",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "Location"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/resource-types": {
        "post": {
          "operationId": "ResourceTypeController_createResourceType",
          "summary": "Create a resource type",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateResourceTypeRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Request successful and item created"
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource-type",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden for this action",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource-type",
                        "constraints": [
                          {
                            "name": "forbidden"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "ResourceType"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ResourceTypeController_getAllResourceTypes",
          "summary": "Retrieve list of your resource types",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "before",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PaginateResult"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/PaginationResourceTypeItemResponse"
                            }
                          },
                          "nextCursor": {
                            "type": "string"
                          },
                          "previousCursor": {
                            "type": "string"
                          },
                          "totalItems": {
                            "type": "number"
                          },
                          "remainingItems": {
                            "type": "number"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource-type",
                        "constraints": [
                          {
                            "name": "unauthorized"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource-type",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "ResourceType"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/resource-types/{id}": {
        "get": {
          "operationId": "ResourceTypeController_getResourceType",
          "summary": "Retrieve a specific resource type",
          "description": "",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Request successful and data retrieved.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReadResourceTypeResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Failed to process request. For more details about our errors see: [Sesami API Error Documentation](https://sesami.dev/docs/sesami-api/errors/)"
            },
            "404": {
              "description": "Resource not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "property": "resource-type",
                        "constraints": [
                          {
                            "name": "not_found"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Our server has some error!"
            }
          },
          "tags": [
            "ResourceType"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shopId}/customers": {
        "post": {
          "operationId": "CustomerController_createCustomer",
          "parameters": [
            {
              "name": "shopId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCustomerRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Customer"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shopId}/customers/:/customerId": {
        "patch": {
          "operationId": "CustomerController_updateCustomer",
          "parameters": [
            {
              "name": "shopId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCustomerRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Customer"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "CustomerController_deleteCustomer",
          "parameters": [
            {
              "name": "shopId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Customer"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "CustomerController_getCustomer",
          "parameters": [
            {
              "name": "shopId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "customerId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Customer"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/{shop}/analytics": {
        "get": {
          "operationId": "AnalyticsController_getAnalytics",
          "parameters": [
            {
              "name": "shop",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Analytics"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Sesami Admin API",
      "description": "Sesami Admin API",
      "version": "1.0.0",
      "contact": {
        "name": "Sesami Community",
        "url": "https://community.sesami.co/",
        "email": ""
      }
    },
    "tags": [],
    "servers": [
      {
        "url": "https://api.sesami.co/api/v1"
      }
    ],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "PaginateResult": {
          "type": "object",
          "properties": {}
        },
        "ReadInstantBookingResponse": {
          "type": "object",
          "properties": {
            "requiredFields": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "ReadSettingResponse": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean"
            },
            "timezone": {
              "type": "string"
            },
            "storefrontButtonLabel": {
              "type": "string"
            },
            "storefrontDateFormat": {
              "type": "string"
            },
            "emailCalendarEventToCustomer": {
              "type": "boolean"
            },
            "emailCalendarEventToMerchant": {
              "type": "boolean"
            },
            "verifyCart": {
              "type": "boolean"
            },
            "removeBranding": {
              "type": "boolean"
            },
            "hideTimezoneFromStorefront": {
              "type": "boolean"
            },
            "locale": {
              "type": "string"
            },
            "timeFormat": {
              "type": "string"
            },
            "reservationPeriod": {
              "type": "number"
            },
            "usesSDK": {
              "type": "boolean"
            },
            "lineItemPropertiesToCapture": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "instantBooking": {
              "$ref": "#/components/schemas/ReadInstantBookingResponse"
            },
            "calendarExperience": {
              "type": "string",
              "enum": [
                "CLASSIC",
                "V2"
              ]
            }
          },
          "required": [
            "calendarExperience"
          ]
        },
        "ReadUploadResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "path": {
              "type": "string"
            }
          }
        },
        "PaginationShopItemResponse": {
          "type": "object",
          "properties": {
            "cursor": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "domain": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "customerEmail": {
              "type": "string"
            },
            "moneyWithCurrencyFormat": {
              "type": "string"
            },
            "settings": {
              "$ref": "#/components/schemas/ReadSettingResponse"
            },
            "isBanned": {
              "type": "boolean"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "isMigrated": {
              "type": "boolean"
            },
            "maxGroupAppointmentsSlots": {
              "type": "number"
            },
            "maxTeamMembers": {
              "type": "number"
            },
            "maxFlows": {
              "type": "number"
            },
            "maxServices": {
              "type": "number"
            },
            "maxLocations": {
              "type": "number"
            },
            "maxResources": {
              "type": "number"
            },
            "maxUsers": {
              "type": "number"
            },
            "status": {
              "type": "boolean"
            }
          },
          "required": [
            "cursor",
            "settings",
            "image"
          ]
        },
        "ReadPlanResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "maxServices": {
              "type": "number"
            },
            "maxTeamMembers": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "title": {
              "type": "string"
            },
            "maxGroupAppointmentsSlots": {
              "type": "number"
            },
            "maxUsers": {
              "type": "number"
            },
            "maxFlows": {
              "type": "number"
            },
            "listed": {
              "type": "boolean"
            },
            "planId": {
              "type": "number"
            },
            "maxLocations": {
              "type": "number"
            },
            "maxResources": {
              "type": "number"
            },
            "maxTokens": {
              "type": "number"
            }
          }
        },
        "ReadShopConfigResponse": {
          "type": "object",
          "properties": {
            "features": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "CALENDAR_SYNC",
                  "REMOVE_BRANDING",
                  "SERVICE_HOURS",
                  "APPOINTMENT_MANAGEMENT",
                  "GROUP_APPOINTMENTS",
                  "APPOINTMENT_REPORT",
                  "RESERVATION",
                  "STOREFRONT_SDK",
                  "FLOWS",
                  "INSTANT_BOOKING",
                  "STOREFRONT_CALENDAR_V2",
                  "ADMIN_CHAT",
                  "PORTAL_ONBOARDING",
                  "SENDER_EMAIL_DOMAIN_VERIFICATION",
                  "EXPERIENCE_SELECTOR",
                  "APPS",
                  "PERSONAL_ACCESS_TOKEN",
                  "MULTI_RESOURCE",
                  "PERMISSIONS",
                  "CUSTOMER_MANAGEMENT"
                ]
              }
            },
            "plan": {
              "$ref": "#/components/schemas/ReadPlanResponse"
            },
            "settings": {
              "$ref": "#/components/schemas/ReadSettingResponse"
            },
            "canSetPermissions": {
              "type": "boolean"
            },
            "locale": {
              "type": "string"
            },
            "maxApp": {
              "type": "number"
            },
            "isMigratedToMRML": {
              "type": "boolean"
            }
          },
          "required": [
            "settings",
            "canSetPermissions"
          ]
        },
        "CreateInstantBookingRequest": {
          "type": "object",
          "properties": {
            "requiredFields": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "CreateSettingRequest": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean"
            },
            "timezone": {
              "type": "string"
            },
            "storefrontButtonLabel": {
              "type": "string"
            },
            "storefrontDateFormat": {
              "type": "string"
            },
            "emailCalendarEventToCustomer": {
              "type": "boolean"
            },
            "emailCalendarEventToMerchant": {
              "type": "boolean"
            },
            "removeBranding": {
              "type": "boolean"
            },
            "hideTimezoneFromStorefront": {
              "type": "boolean"
            },
            "locale": {
              "type": "string"
            },
            "timeFormat": {
              "type": "string"
            },
            "reservationPeriod": {
              "type": "number"
            },
            "instantBooking": {
              "$ref": "#/components/schemas/CreateInstantBookingRequest"
            },
            "calendarExperience": {
              "type": "string",
              "enum": [
                "CLASSIC",
                "V2"
              ]
            }
          },
          "required": [
            "timezone",
            "storefrontButtonLabel",
            "locale",
            "timeFormat",
            "reservationPeriod"
          ]
        },
        "CreateShopRequest": {
          "type": "object",
          "properties": {
            "externalId": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "platform": {
              "type": "string"
            },
            "domain": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "shopifyPlan": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "customerEmail": {
              "type": "string"
            },
            "moneyWithCurrencyFormat": {
              "type": "string"
            },
            "settings": {
              "$ref": "#/components/schemas/CreateSettingRequest"
            },
            "usesOnlineStore2": {
              "type": "boolean"
            },
            "isBanned": {
              "type": "boolean"
            },
            "image": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "email",
            "currency",
            "customerEmail",
            "moneyWithCurrencyFormat",
            "settings"
          ]
        },
        "ReadShopResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "domain": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "customerEmail": {
              "type": "string"
            },
            "moneyWithCurrencyFormat": {
              "type": "string"
            },
            "settings": {
              "$ref": "#/components/schemas/ReadSettingResponse"
            },
            "isBanned": {
              "type": "boolean"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "isMigrated": {
              "type": "boolean"
            },
            "maxGroupAppointmentsSlots": {
              "type": "number"
            },
            "maxTeamMembers": {
              "type": "number"
            },
            "maxFlows": {
              "type": "number"
            },
            "maxServices": {
              "type": "number"
            },
            "maxLocations": {
              "type": "number"
            },
            "maxResources": {
              "type": "number"
            },
            "maxUsers": {
              "type": "number"
            },
            "status": {
              "type": "boolean"
            }
          },
          "required": [
            "settings",
            "image"
          ]
        },
        "UpdateSettingRequest": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean"
            },
            "timezone": {
              "type": "string"
            },
            "storefrontButtonLabel": {
              "type": "string"
            },
            "storefrontDateFormat": {
              "type": "string"
            },
            "emailCalendarEventToCustomer": {
              "type": "boolean"
            },
            "emailCalendarEventToMerchant": {
              "type": "boolean"
            },
            "removeBranding": {
              "type": "boolean"
            },
            "hideTimezoneFromStorefront": {
              "type": "boolean"
            },
            "locale": {
              "type": "string"
            },
            "timeFormat": {
              "type": "string"
            },
            "reservationPeriod": {
              "type": "number"
            },
            "instantBooking": {
              "$ref": "#/components/schemas/CreateInstantBookingRequest"
            },
            "calendarExperience": {
              "type": "string",
              "enum": [
                "CLASSIC",
                "V2"
              ]
            }
          }
        },
        "UpdateShopRequest": {
          "type": "object",
          "properties": {
            "settings": {
              "$ref": "#/components/schemas/UpdateSettingRequest"
            },
            "image": {
              "type": "string"
            }
          }
        },
        "ReadServiceVariantOptionResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        },
        "ReadServiceVariantResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "options": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadServiceVariantOptionResponse"
              }
            }
          }
        },
        "ReadAvailabilityIntervalResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "from": {
              "type": "string"
            },
            "to": {
              "type": "string"
            },
            "unavailable": {
              "type": "boolean"
            }
          }
        },
        "ReadAvailabilityResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "wday",
                "date"
              ]
            },
            "weekday": {
              "type": "string",
              "enum": [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday"
              ]
            },
            "date": {
              "type": "string"
            },
            "intervals": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAvailabilityIntervalResponse"
              }
            }
          },
          "required": [
            "intervals"
          ]
        },
        "ReadServiceLocationResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "content": {
              "type": "string"
            }
          }
        },
        "ServiceResourceResponseREST": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "string"
            },
            "isSelectable": {
              "type": "boolean"
            },
            "isTimeBlocker": {
              "type": "boolean"
            },
            "ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "hideAnyAvailable": {
              "type": "boolean"
            }
          },
          "required": [
            "typeId",
            "isSelectable",
            "isTimeBlocker",
            "ids"
          ]
        },
        "ReadLocationResourceResponseREST": {
          "type": "object",
          "properties": {
            "locationId": {
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ServiceResourceResponseREST"
              }
            }
          },
          "required": [
            "locationId",
            "resources"
          ]
        },
        "PaginationServiceItemResponse": {
          "type": "object",
          "properties": {
            "cursor": {
              "type": "string"
            },
            "teamMembers": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "id": {
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "onlineStoreUrl": {
              "type": "string"
            },
            "onlineStorePreviewUrl": {
              "type": "string"
            },
            "urlKey": {
              "type": "string"
            },
            "teamMemberAssignStrategy": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "instantBooking": {
              "type": "boolean"
            },
            "availabilitiesSavedAt": {
              "format": "date-time",
              "type": "string"
            },
            "displayTeamOnStorefront": {
              "type": "boolean"
            },
            "disableSameDayBooking": {
              "type": "boolean"
            },
            "roundStartInterval": {
              "type": "number"
            },
            "bufferFromNow": {
              "type": "number"
            },
            "advancedOptions": {
              "type": "boolean"
            },
            "storefrontStartDate": {
              "type": "string"
            },
            "bookingUntilDays": {
              "type": "number"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "status": {
              "type": "boolean"
            },
            "customerCanCancel": {
              "type": "boolean"
            },
            "customerCanReschedule": {
              "type": "boolean"
            },
            "refundMoneyOnCancel": {
              "type": "boolean"
            },
            "customerCanManageBefore": {
              "type": "number"
            },
            "groupAppointments": {
              "type": "boolean"
            },
            "groupAppointmentSlots": {
              "type": "number"
            },
            "variants": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadServiceVariantResponse"
              }
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAvailabilityResponse"
              }
            },
            "location": {
              "$ref": "#/components/schemas/ReadServiceLocationResponse"
            },
            "flexStartInterval": {
              "type": "string",
              "enum": [
                "FIFTEEN",
                "THIRTY",
                "FORTY_FIVE",
                "SIXTY"
              ]
            },
            "createOrder": {
              "type": "boolean"
            },
            "locationIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locations": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadLocationResourceResponseREST"
              }
            },
            "shopId": {
              "type": "string"
            }
          },
          "required": [
            "cursor",
            "image",
            "variants",
            "availabilities",
            "location",
            "createOrder",
            "locations"
          ]
        },
        "ReadServiceResponse": {
          "type": "object",
          "properties": {
            "teamMembers": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "id": {
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "onlineStoreUrl": {
              "type": "string"
            },
            "onlineStorePreviewUrl": {
              "type": "string"
            },
            "urlKey": {
              "type": "string"
            },
            "teamMemberAssignStrategy": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "instantBooking": {
              "type": "boolean"
            },
            "availabilitiesSavedAt": {
              "format": "date-time",
              "type": "string"
            },
            "displayTeamOnStorefront": {
              "type": "boolean"
            },
            "disableSameDayBooking": {
              "type": "boolean"
            },
            "roundStartInterval": {
              "type": "number"
            },
            "bufferFromNow": {
              "type": "number"
            },
            "advancedOptions": {
              "type": "boolean"
            },
            "storefrontStartDate": {
              "type": "string"
            },
            "bookingUntilDays": {
              "type": "number"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "status": {
              "type": "boolean"
            },
            "customerCanCancel": {
              "type": "boolean"
            },
            "customerCanReschedule": {
              "type": "boolean"
            },
            "refundMoneyOnCancel": {
              "type": "boolean"
            },
            "customerCanManageBefore": {
              "type": "number"
            },
            "groupAppointments": {
              "type": "boolean"
            },
            "groupAppointmentSlots": {
              "type": "number"
            },
            "variants": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadServiceVariantResponse"
              }
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAvailabilityResponse"
              }
            },
            "location": {
              "$ref": "#/components/schemas/ReadServiceLocationResponse"
            },
            "flexStartInterval": {
              "enum": [
                "FIFTEEN",
                "THIRTY",
                "FORTY_FIVE",
                "SIXTY"
              ],
              "type": "string"
            },
            "createOrder": {
              "type": "boolean"
            },
            "locationIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locations": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadLocationResourceResponseREST"
              }
            },
            "shopId": {
              "type": "string"
            }
          },
          "required": [
            "image",
            "variants",
            "availabilities",
            "location",
            "createOrder",
            "locations"
          ]
        },
        "CreateServiceLocationRequest": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            }
          }
        },
        "CreateAvailabilityIntervalRequest": {
          "type": "object",
          "properties": {
            "from": {
              "type": "string"
            },
            "to": {
              "type": "string"
            }
          },
          "required": [
            "from",
            "to"
          ]
        },
        "CreateAvailabilityRequest": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "wday",
                "date"
              ]
            },
            "weekday": {
              "type": "string",
              "enum": [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday"
              ]
            },
            "date": {
              "type": "string"
            },
            "intervals": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CreateAvailabilityIntervalRequest"
              }
            }
          },
          "required": [
            "type",
            "intervals"
          ]
        },
        "AnyScalar": {
          "type": "object",
          "properties": {}
        },
        "CreateFromRangeRequest": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "DAYS_INTO_THE_FUTURE",
                "EXACT_DATE",
                "NOW"
              ]
            },
            "value": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          },
          "required": [
            "type"
          ]
        },
        "CreateToRangeRequest": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "DAYS_INTO_THE_FUTURE",
                "EXACT_DATE",
                "INDEFINITELY"
              ]
            },
            "value": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          },
          "required": [
            "type"
          ]
        },
        "CreateResourceAvailabilityRangeRequest": {
          "type": "object",
          "properties": {
            "availableFrom": {
              "$ref": "#/components/schemas/CreateFromRangeRequest"
            },
            "availableTo": {
              "$ref": "#/components/schemas/CreateToRangeRequest"
            }
          },
          "required": [
            "availableFrom",
            "availableTo"
          ]
        },
        "CreateVariantDTO": {
          "type": "object",
          "properties": {
            "duration": {
              "type": "number"
            },
            "price": {
              "type": "number"
            },
            "title": {
              "type": "string"
            },
            "externalId": {
              "type": "string"
            }
          },
          "required": [
            "duration",
            "price",
            "title"
          ]
        },
        "ServiceResourceRequest": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "string"
            },
            "isSelectable": {
              "type": "boolean"
            },
            "blocksDuringAppointment": {
              "type": "boolean"
            },
            "ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "hideAnyAvailable": {
              "type": "boolean"
            }
          },
          "required": [
            "typeId",
            "isSelectable",
            "blocksDuringAppointment",
            "ids"
          ]
        },
        "LocationResourceRequest": {
          "type": "object",
          "properties": {
            "locationId": {
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ServiceResourceRequest"
              }
            }
          },
          "required": [
            "locationId",
            "resources"
          ]
        },
        "UpdateServiceRequest": {
          "type": "object",
          "properties": {
            "displayTeamOnStorefront": {
              "type": "boolean"
            },
            "bookingUntilDays": {
              "type": "number"
            },
            "location": {
              "$ref": "#/components/schemas/CreateServiceLocationRequest"
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CreateAvailabilityRequest"
              }
            },
            "teamMembers": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "availabilityRange": {
              "$ref": "#/components/schemas/CreateResourceAvailabilityRangeRequest"
            },
            "variants": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CreateVariantDTO"
              }
            },
            "externalSource": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "instantBooking": {
              "type": "boolean"
            },
            "disableSameDayBooking": {
              "type": "boolean"
            },
            "roundStartInterval": {
              "type": "number"
            },
            "bufferFromNow": {
              "type": "number"
            },
            "storefrontStartDate": {
              "format": "date-time",
              "type": "string"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "customerCanCancel": {
              "type": "boolean"
            },
            "customerCanReschedule": {
              "type": "boolean"
            },
            "refundMoneyOnCancel": {
              "type": "boolean"
            },
            "customerCanManageBefore": {
              "type": "number"
            },
            "groupAppointments": {
              "type": "boolean"
            },
            "groupAppointmentSlots": {
              "type": "number"
            },
            "flexStartInterval": {
              "type": "string",
              "enum": [
                "FIFTEEN",
                "THIRTY",
                "FORTY_FIVE",
                "SIXTY"
              ]
            },
            "createOrder": {
              "type": "boolean"
            },
            "locationResources": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/LocationResourceRequest"
              }
            }
          }
        },
        "EmptyResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string"
            }
          }
        },
        "ReadWhenResponse": {
          "type": "object",
          "properties": {
            "offset": {
              "type": "number"
            },
            "amount": {
              "type": "number"
            },
            "unit": {
              "type": "string",
              "enum": [
                "IMMEDIATELY",
                "MINUTES_BEFORE",
                "HOURS_BEFORE",
                "DAYS_BEFORE",
                "MINUTES_AFTER",
                "HOURS_AFTER",
                "DAYS_AFTER"
              ]
            }
          }
        },
        "ReadTemplateResponse": {
          "type": "object",
          "properties": {
            "headers": {
              "type": "string"
            },
            "body": {
              "type": "string"
            }
          }
        },
        "PaginationFlowItemResponse": {
          "type": "object",
          "properties": {
            "cursor": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "name": {
              "type": "string"
            },
            "trigger": {
              "type": "string",
              "enum": [
                "APPOINTMENT_CREATED",
                "APPOINTMENT_RESCHEDULED",
                "CUSTOMER_CHECKED_IN",
                "APPOINTMENT_STARTED",
                "APPOINTMENT_CANCELLED",
                "NO_SHOW"
              ]
            },
            "action": {
              "type": "string",
              "enum": [
                "EMAIL",
                "WEBHOOK"
              ]
            },
            "target": {
              "type": "string"
            },
            "when": {
              "$ref": "#/components/schemas/ReadWhenResponse"
            },
            "template": {
              "$ref": "#/components/schemas/ReadTemplateResponse"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "cursor"
          ]
        },
        "ReadFlowResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "name": {
              "type": "string"
            },
            "trigger": {
              "enum": [
                "APPOINTMENT_CREATED",
                "APPOINTMENT_RESCHEDULED",
                "CUSTOMER_CHECKED_IN",
                "APPOINTMENT_STARTED",
                "APPOINTMENT_CANCELLED",
                "NO_SHOW"
              ],
              "type": "string"
            },
            "action": {
              "enum": [
                "EMAIL",
                "WEBHOOK"
              ],
              "type": "string"
            },
            "target": {
              "type": "string"
            },
            "when": {
              "$ref": "#/components/schemas/ReadWhenResponse"
            },
            "template": {
              "$ref": "#/components/schemas/ReadTemplateResponse"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          }
        },
        "CreateWhenRequest": {
          "type": "object",
          "properties": {
            "offset": {
              "type": "number"
            },
            "amount": {
              "type": "number"
            },
            "unit": {
              "type": "string",
              "enum": [
                "IMMEDIATELY",
                "MINUTES_BEFORE",
                "HOURS_BEFORE",
                "DAYS_BEFORE",
                "MINUTES_AFTER",
                "HOURS_AFTER",
                "DAYS_AFTER"
              ]
            }
          },
          "required": [
            "amount",
            "unit"
          ]
        },
        "CreateTemplateRequest": {
          "type": "object",
          "properties": {
            "headers": {
              "type": "string"
            },
            "body": {
              "type": "string"
            }
          },
          "required": [
            "headers",
            "body"
          ]
        },
        "CreateFlowRequest": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean"
            },
            "name": {
              "type": "string"
            },
            "trigger": {
              "type": "string",
              "enum": [
                "APPOINTMENT_CREATED",
                "APPOINTMENT_RESCHEDULED",
                "CUSTOMER_CHECKED_IN",
                "APPOINTMENT_STARTED",
                "APPOINTMENT_CANCELLED",
                "NO_SHOW"
              ]
            },
            "action": {
              "type": "string",
              "enum": [
                "EMAIL",
                "WEBHOOK"
              ]
            },
            "target": {
              "type": "string"
            },
            "when": {
              "$ref": "#/components/schemas/CreateWhenRequest"
            },
            "template": {
              "$ref": "#/components/schemas/CreateTemplateRequest"
            }
          },
          "required": [
            "status",
            "name",
            "trigger",
            "action",
            "target",
            "when",
            "template"
          ]
        },
        "UpdateFlowRequest": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean"
            },
            "name": {
              "type": "string"
            },
            "trigger": {
              "type": "string",
              "enum": [
                "APPOINTMENT_CREATED",
                "APPOINTMENT_RESCHEDULED",
                "CUSTOMER_CHECKED_IN",
                "APPOINTMENT_STARTED",
                "APPOINTMENT_CANCELLED",
                "NO_SHOW"
              ]
            },
            "action": {
              "type": "string",
              "enum": [
                "EMAIL",
                "WEBHOOK"
              ]
            },
            "target": {
              "type": "string"
            },
            "when": {
              "$ref": "#/components/schemas/CreateWhenRequest"
            },
            "template": {
              "$ref": "#/components/schemas/CreateTemplateRequest"
            }
          }
        },
        "ReadCustomerResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "billingPhone": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "externalSource": {
              "type": "string"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "image"
          ]
        },
        "ReadLineItemPropertyResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        },
        "ReadAppointmentEventResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "CANCELLED",
                "CREATED",
                "NO_SHOW",
                "RESCHEDULED",
                "CUSTOMER_CHECKIN",
                "CONFIRMATIONEMAILSENT"
              ]
            },
            "content": {
              "type": "string"
            },
            "initiatedBy": {
              "type": "string"
            },
            "dateTime": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "id"
          ]
        },
        "ReadAppointmentResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "shopId": {
              "type": "string"
            },
            "orderId": {
              "type": "string"
            },
            "orderName": {
              "type": "string"
            },
            "lineItemId": {
              "type": "string"
            },
            "customer": {
              "$ref": "#/components/schemas/ReadCustomerResponse"
            },
            "customerTimezone": {
              "type": "string"
            },
            "customerManagementLink": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "datetime": {
              "type": "string"
            },
            "rangeStart": {
              "type": "string"
            },
            "rangeEnd": {
              "type": "string"
            },
            "variantTitle": {
              "type": "string"
            },
            "externalVariantId": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            },
            "currency": {
              "type": "string"
            },
            "status": {
              "type": "string"
            },
            "gateway": {
              "type": "string"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "service": {
              "type": "string"
            },
            "teamMember": {
              "type": "string"
            },
            "slotId": {
              "type": "string"
            },
            "instantBookingId": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "locale": {
              "type": "string"
            },
            "lineItemProperties": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadLineItemPropertyResponse"
              }
            },
            "events": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAppointmentEventResponse"
              }
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            },
            "sessionId": {
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locationId": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "lineItemProperties",
            "events",
            "resources"
          ]
        },
        "PaginationAppointmentItemResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "shopId": {
              "type": "string"
            },
            "orderId": {
              "type": "string"
            },
            "orderName": {
              "type": "string"
            },
            "lineItemId": {
              "type": "string"
            },
            "customer": {
              "$ref": "#/components/schemas/ReadCustomerResponse"
            },
            "customerTimezone": {
              "type": "string"
            },
            "customerManagementLink": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "datetime": {
              "type": "string"
            },
            "rangeStart": {
              "type": "string"
            },
            "rangeEnd": {
              "type": "string"
            },
            "variantTitle": {
              "type": "string"
            },
            "externalVariantId": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            },
            "currency": {
              "type": "string"
            },
            "status": {
              "type": "string"
            },
            "gateway": {
              "type": "string"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "service": {
              "type": "string"
            },
            "teamMember": {
              "type": "string"
            },
            "slotId": {
              "type": "string"
            },
            "instantBookingId": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "locale": {
              "type": "string"
            },
            "lineItemProperties": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadLineItemPropertyResponse"
              }
            },
            "events": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAppointmentEventResponse"
              }
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            },
            "sessionId": {
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locationId": {
              "type": "string"
            },
            "cursor": {
              "type": "string"
            },
            "serviceObject": {
              "$ref": "#/components/schemas/ReadServiceResponse"
            },
            "teamMemberObject": {
              "$ref": "#/components/schemas/ReadServiceResponse"
            }
          },
          "required": [
            "id",
            "lineItemProperties",
            "events",
            "resources",
            "cursor"
          ]
        },
        "AppointmentGenerateReportQuery": {
          "type": "object",
          "properties": {
            "teamMember": {
              "type": "string"
            },
            "service": {
              "type": "string"
            },
            "start": {
              "format": "date-time",
              "type": "string"
            },
            "end": {
              "format": "date-time",
              "type": "string"
            },
            "filterType": {
              "enum": [
                "ALL",
                "UPCOMING",
                "PAST",
                "RANGE"
              ],
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "timezone": {
              "type": "string"
            },
            "locationId": {
              "type": "string"
            }
          }
        },
        "GenerateReportResponse": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            }
          },
          "required": [
            "email"
          ]
        },
        "CancelAppointmentRequest": {
          "type": "object",
          "properties": {
            "refundMoney": {
              "type": "boolean"
            },
            "content": {
              "type": "string"
            }
          },
          "required": [
            "refundMoney"
          ]
        },
        "CreateAppointmentEventRequest": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            },
            "dateTime": {
              "format": "date-time",
              "type": "string"
            }
          }
        },
        "RescheduleAppointmentRequest": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            },
            "dateTime": {
              "format": "date-time",
              "type": "string"
            },
            "teamMemberId": {
              "type": "string"
            },
            "resourceIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locationId": {
              "type": "string"
            },
            "timezone": {
              "type": "string"
            }
          }
        },
        "GetCalendarBlockSlotsRequest": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string"
            },
            "teamMembers": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "shop": {
              "type": "string"
            },
            "resourceIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locationId": {
              "type": "string"
            },
            "timezone": {
              "type": "string"
            }
          },
          "required": [
            "date",
            "shop"
          ]
        },
        "ReadCalendarServiceResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "groupAppointmentSlots": {
              "type": "number"
            },
            "groupAppointments": {
              "type": "boolean"
            }
          },
          "required": [
            "groupAppointments"
          ]
        },
        "CalendarSlotItemResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "appointment",
                "external",
                "buffer",
                "reservation"
              ]
            },
            "customer": {
              "$ref": "#/components/schemas/ReadCustomerResponse"
            }
          },
          "required": [
            "type"
          ]
        },
        "ReadCalendarTeamMemberSlotResponse": {
          "type": "object",
          "properties": {
            "dateTime": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            },
            "service": {
              "$ref": "#/components/schemas/ReadCalendarServiceResponse"
            },
            "variantTitle": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CalendarSlotItemResponse"
              }
            }
          },
          "required": [
            "dateTime",
            "duration",
            "items"
          ]
        },
        "ReadCalendarTeamMemberResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "slots": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadCalendarTeamMemberSlotResponse"
              }
            }
          },
          "required": [
            "slots"
          ]
        },
        "ReadCalendarResourceSlotResponse": {
          "type": "object",
          "properties": {
            "dateTime": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            },
            "service": {
              "$ref": "#/components/schemas/ReadCalendarServiceResponse"
            },
            "variantTitle": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CalendarSlotItemResponse"
              }
            }
          },
          "required": [
            "dateTime",
            "duration",
            "items"
          ]
        },
        "ReadCalendarResourceResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "slots": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadCalendarResourceSlotResponse"
              }
            }
          },
          "required": [
            "slots"
          ]
        },
        "ReadCalendarBlockSlotsResponse": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string"
            },
            "now": {
              "type": "string"
            },
            "teamMembers": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadCalendarTeamMemberResponse"
              }
            },
            "resources": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadCalendarResourceResponse"
              }
            }
          },
          "required": [
            "date",
            "now"
          ]
        },
        "PaginationReservationItemResponse": {
          "type": "object",
          "properties": {
            "cursor": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "shopId": {
              "type": "string"
            },
            "customer": {
              "$ref": "#/components/schemas/ReadCustomerResponse"
            },
            "customerTimezone": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "dateTime": {
              "type": "string"
            },
            "rangeStart": {
              "type": "string"
            },
            "rangeEnd": {
              "type": "string"
            },
            "variantTitle": {
              "type": "string"
            },
            "externalVariantId": {
              "type": "string"
            },
            "duration": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "service": {
              "$ref": "#/components/schemas/ReadServiceResponse"
            },
            "teamMember": {
              "type": "string"
            },
            "slotId": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "clientId": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "cursor",
            "id",
            "currency",
            "resources"
          ]
        },
        "ReadReservationResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "shopId": {
              "type": "string"
            },
            "customer": {
              "$ref": "#/components/schemas/ReadCustomerResponse"
            },
            "customerTimezone": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "dateTime": {
              "type": "string"
            },
            "rangeStart": {
              "type": "string"
            },
            "rangeEnd": {
              "type": "string"
            },
            "variantTitle": {
              "type": "string"
            },
            "externalVariantId": {
              "type": "string"
            },
            "duration": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "bufferTimeBefore": {
              "type": "number"
            },
            "bufferTimeAfter": {
              "type": "number"
            },
            "service": {
              "$ref": "#/components/schemas/ReadServiceResponse"
            },
            "teamMember": {
              "type": "string"
            },
            "slotId": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "clientId": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            },
            "resources": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "id",
            "currency",
            "resources"
          ]
        },
        "CreateUserRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "permissions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "shop": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "permissions",
            "shop"
          ]
        },
        "ReadUserSelfResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "loginStrategy": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "googleId": {
              "type": "string"
            },
            "auth0Id": {
              "type": "string"
            },
            "permissions": {
              "type": "object"
            },
            "locale": {
              "type": "string"
            }
          },
          "required": [
            "permissions"
          ]
        },
        "LoginWithPasswordRequest": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          },
          "required": [
            "password",
            "email"
          ]
        },
        "ReadTokenResponse": {
          "type": "object",
          "properties": {
            "access_token": {
              "type": "string"
            },
            "refresh_token": {
              "type": "string"
            }
          },
          "required": [
            "access_token",
            "refresh_token"
          ]
        },
        "ManagePermissionsRequest": {
          "type": "object",
          "properties": {
            "permissions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "permissions"
          ]
        },
        "ReadUserResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "permissions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locale": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "permissionsAccepted": {
              "type": "boolean"
            }
          },
          "required": [
            "id",
            "email",
            "permissions"
          ]
        },
        "PaginationUserItemResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "permissions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "locale": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "permissionsAccepted": {
              "type": "boolean"
            },
            "cursor": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "email",
            "permissions",
            "cursor"
          ]
        },
        "UpdateMeRequest": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "locale": {
              "type": "string"
            },
            "image": {
              "type": "string"
            }
          },
          "required": [
            "locale"
          ]
        },
        "ReadSlotResponse": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "enum": [
                "available",
                "unavailable"
              ]
            },
            "remainingSlots": {
              "type": "number"
            },
            "startTime": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            }
          },
          "required": [
            "status",
            "remainingSlots",
            "startTime",
            "duration"
          ]
        },
        "ReadAvailabilitySlotResponse": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string"
            },
            "slots": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadSlotResponse"
              }
            }
          },
          "required": [
            "date",
            "slots"
          ]
        },
        "GetRefreshTokenRequest": {
          "type": "object",
          "properties": {
            "refreshToken": {
              "type": "string"
            }
          },
          "required": [
            "refreshToken"
          ]
        },
        "CreatePATRequest": {
          "type": "object",
          "properties": {
            "permissions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "expireAt": {
              "type": "string",
              "enum": [
                "THIRTY",
                "SIXTY",
                "NINETY",
                "NEVER"
              ]
            },
            "shop": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "user": {
              "type": "string"
            }
          },
          "required": [
            "permissions",
            "expireAt",
            "shop",
            "name",
            "user"
          ]
        },
        "GetOnlineTokenRequest": {
          "type": "object",
          "properties": {
            "appId": {
              "type": "string"
            },
            "shop": {
              "type": "string"
            },
            "extensionId": {
              "type": "string"
            }
          },
          "required": [
            "appId",
            "shop"
          ]
        },
        "AccessTokenRequest": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "PERSONAL_ACCESS_TOKEN",
                "ONLINE_TOKEN"
              ]
            },
            "personalAccessTokenRequest": {
              "$ref": "#/components/schemas/CreatePATRequest"
            },
            "onlineTokenRequest": {
              "$ref": "#/components/schemas/GetOnlineTokenRequest"
            }
          },
          "required": [
            "type"
          ]
        },
        "AccessTokenResponse": {
          "type": "object",
          "properties": {}
        },
        "ApiKeyRestRequest": {
          "type": "object",
          "properties": {}
        },
        "AvailableFromResponse": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "DAYS_INTO_THE_FUTURE",
                "EXACT_DATE",
                "NOW"
              ]
            },
            "value": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          },
          "required": [
            "type",
            "value"
          ]
        },
        "AvailableToResponse": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "DAYS_INTO_THE_FUTURE",
                "EXACT_DATE",
                "INDEFINITELY"
              ]
            },
            "value": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          },
          "required": [
            "type",
            "value"
          ]
        },
        "ReadAvailabilitiesRangeResponse": {
          "type": "object",
          "properties": {
            "availableFrom": {
              "$ref": "#/components/schemas/AvailableFromResponse"
            },
            "availableTo": {
              "$ref": "#/components/schemas/AvailableToResponse"
            }
          },
          "required": [
            "availableFrom",
            "availableTo"
          ]
        },
        "ReadResourceResponseREST": {
          "type": "object",
          "properties": {
            "availabilitiesRange": {
              "$ref": "#/components/schemas/ReadAvailabilitiesRangeResponse"
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAvailabilityResponse"
              }
            },
            "timezone": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "shopId": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "mobile": {
              "type": "string"
            },
            "notificationEmailStatus": {
              "type": "boolean"
            },
            "metaFields": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          },
          "required": [
            "availabilitiesRange",
            "availabilities",
            "timezone",
            "id",
            "name",
            "type",
            "status",
            "image",
            "shopId",
            "metaFields"
          ]
        },
        "CreateResourceRequest": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "timezone": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "email": {
              "type": "string"
            },
            "image": {
              "type": "string"
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CreateAvailabilityRequest"
              }
            },
            "availabilitiesRange": {
              "$ref": "#/components/schemas/CreateResourceAvailabilityRangeRequest"
            },
            "description": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "mobile": {
              "type": "string"
            },
            "notificationEmailStatus": {
              "type": "boolean"
            }
          },
          "required": [
            "typeId",
            "name"
          ]
        },
        "UpdateResourceRequest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "image": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CreateAvailabilityRequest"
              }
            },
            "availabilitiesRange": {
              "$ref": "#/components/schemas/CreateResourceAvailabilityRangeRequest"
            },
            "timezone": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "mobile": {
              "type": "string"
            },
            "notificationEmailStatus": {
              "type": "boolean"
            }
          }
        },
        "PaginationResourceItemResponseREST": {
          "type": "object",
          "properties": {
            "availabilitiesRange": {
              "$ref": "#/components/schemas/ReadAvailabilitiesRangeResponse"
            },
            "availabilities": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReadAvailabilityResponse"
              }
            },
            "timezone": {
              "type": "string"
            },
            "cursor": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "shopId": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "eventDescription": {
              "type": "string"
            },
            "mobile": {
              "type": "string"
            },
            "notificationEmailStatus": {
              "type": "boolean"
            },
            "metaFields": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          },
          "required": [
            "availabilitiesRange",
            "availabilities",
            "timezone",
            "cursor",
            "id",
            "name",
            "type",
            "status",
            "image",
            "shopId",
            "metaFields"
          ]
        },
        "UpdateSubscriberRequest": {
          "type": "object",
          "properties": {
            "target": {
              "type": "string"
            },
            "isActive": {
              "type": "boolean"
            },
            "subscriberEmail": {
              "type": "string"
            },
            "metadata": {
              "$ref": "#/components/schemas/AnyScalar"
            }
          }
        },
        "BusinessAddressRequest": {
          "type": "object",
          "properties": {
            "address": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "zipCode": {
              "type": "string"
            },
            "address2": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "latitude": {
              "type": "number"
            },
            "longitude": {
              "type": "number"
            },
            "state": {
              "type": "string"
            },
            "suite": {
              "type": "string"
            }
          }
        },
        "CreateLocationRequest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "timezone": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "image": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "businessAddress": {
              "$ref": "#/components/schemas/BusinessAddressRequest"
            },
            "isDefault": {
              "type": "boolean"
            }
          },
          "required": [
            "name"
          ]
        },
        "UpdateLocationRequest": {
          "type": "object",
          "properties": {}
        },
        "ReadBusinessAddress": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "latitude": {
              "type": "number"
            },
            "longitude": {
              "type": "number"
            },
            "address2": {
              "type": "string"
            },
            "zipCode": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            },
            "suite": {
              "type": "string"
            }
          },
          "required": [
            "country",
            "address",
            "address2",
            "zipCode",
            "city",
            "state"
          ]
        },
        "ReadLocationResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "businessAddress": {
              "$ref": "#/components/schemas/ReadBusinessAddress"
            },
            "timezone": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "shopId": {
              "type": "string"
            },
            "isDefault": {
              "type": "boolean"
            }
          },
          "required": [
            "id",
            "name",
            "description",
            "image",
            "businessAddress",
            "timezone",
            "status",
            "shopId",
            "isDefault"
          ]
        },
        "PaginationLocationItemResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "image": {
              "$ref": "#/components/schemas/ReadUploadResponse"
            },
            "businessAddress": {
              "$ref": "#/components/schemas/ReadBusinessAddress"
            },
            "timezone": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "shopId": {
              "type": "string"
            },
            "isDefault": {
              "type": "boolean"
            },
            "cursor": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name",
            "description",
            "image",
            "businessAddress",
            "timezone",
            "status",
            "shopId",
            "isDefault",
            "cursor"
          ]
        },
        "CreateResourceTypeRequest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "ReadResourceTypeResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "PaginationResourceTypeItemResponse": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "cursor": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name",
            "cursor"
          ]
        },
        "CreateCustomerRequest": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "externalId": {
              "type": "string"
            },
            "externalSource": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "image": {
              "type": "string"
            }
          }
        },
        "UpdateCustomerRequest": {
          "type": "object",
          "properties": {}
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}

