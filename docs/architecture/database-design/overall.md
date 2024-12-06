---
title: "Overall"
sidebar_position: 1
---

Here is a database documentation template based on the provided data:

---

# Database Documentation

## Overview
This document provides a detailed schema description of the database tables, columns, and their respective properties. Each table is listed with its schema, columns, data types, default values, constraints, and other relevant metadata.
### **animal_infos**
| Column Name                | Data Type                | Default Value                      | Nullable |
|----------------------------|--------------------------|------------------------------------|----------|
| id                         | uuid                     | uuid_generate_v4()                 | NO       |
| currentGrowthTime          | integer                  | 0                                  | NO       |
| currentHungryTime          | integer                  | 0                                  | NO       |
| currentYieldTime           | integer                  | 0                                  | NO       |
| hasYielded                 | boolean                  | false                              | NO       |
| isAdult                    | boolean                  | false                              | NO       |
| animal_id                  | character varying        | NULL                               | NO       |
| currentState               | USER-DEFINED             | 'normal'::animal_infos_currentstate_enum | NO       |
| harvestQuantityRemaining   | integer                  | NULL                               | YES      |
| alreadySick                | boolean                  | false                              | NO       |
| created_at                 | timestamp with time zone | now()                              | NO       |
| updated_at                 | timestamp with time zone | now()                              | NO       |
> Refferences: 
> - [Animals](#animals)
> - [Animal Infos Thiefed By Users](#animal_infos_thiefed_by_users)
---

### **animal_infos_thiefed_by_users**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| animalInfosId    | uuid                    | NULL          | NO       |
| usersId          | uuid                    | NULL          | NO       |
> Refferences: 
> - [Animals](#animals)
> - [Animal Infos](#animal_infos)
--- 

### **animals**
| Column Name                 | Data Type                | Default Value | Nullable |
|-----------------------------|--------------------------|---------------|----------|
| price                       | integer                 | NULL          | YES      |
| growth_time                 | integer                 | NULL          | NO       |
| available_in_shop           | boolean                 | NULL          | NO       |
| hunger_time                 | integer                 | NULL          | NO       |
| min_harvest_quantity        | integer                 | NULL          | NO       |
| max_harvest_quantity        | integer                 | NULL          | NO       |
| basic_harvest_experiences   | integer                 | NULL          | NO       |
| premium_harvest_experiences | integer                 | NULL          | NO       |
| type                        | USER-DEFINED            | NULL          | NO       |
| sick_chance                 | double precision        | NULL          | NO       |
| yield_time                  | integer                 | NULL          | NO       |
| offspring_price             | integer                 | NULL          | NO       |
| is_nft                      | boolean                 | NULL          | NO       |
| created_at                  | timestamp with time zone| now()         | NO       |
| updated_at                  | timestamp with time zone| now()         | NO       |
> Refferences: 
> - [Animal Infos](#animal_infos)
> - [Animal Infos Thiefed By Users](#animal_infos_thiefed_by_users)
---

### **buildings**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| available_in_shop| boolean                 | NULL          | NO       |
| type             | USER-DEFINED            | NULL          | YES      |
| max_upgrade      | integer                 | NULL          | NO       |
| price            | integer                 | NULL          | YES      |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **collections**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | uuid                    | uuid_generate_v4() | NO    |
| data             | jsonb                   | NULL          | NO       |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **daily_rewards**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| golds            | integer                 | NULL          | YES      |
| tokens           | double precision        | NULL          | YES      |
| reward_day       | integer                 | NULL          | NO       |
| last_day         | boolean                 | false         | NO       |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **healthcheck**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | uuid                    | uuid_generate_v4() | NO    |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |
| message          | character varying       | NULL          | YES      |

---

### **inventories**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | uuid                    | uuid_generate_v4() | NO    |
| quantity         | integer                 | 1             | NO       |
| premium          | boolean                 | false         | NO       |
| is_placed        | boolean                 | false         | NO       |
| user_id          | uuid                    | NULL          | YES      |
| inventory_type_id| character varying       | NULL          | YES      |
| token_id         | character varying (100) | NULL          | YES      |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **inventory_types**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| type             | USER-DEFINED            | NULL          | NO       |
| placeable        | boolean                 | false         | NO       |
| deliverable      | boolean                 | false         | NO       |
| as_tool          | boolean                 | false         | NO       |
| max_stack        | integer                 | 16            | NO       |
| tile_id          | character varying       | NULL          | YES      |
| crop_id          | character varying       | NULL          | YES      |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **seed_growth_info_thiefed_by_users**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| seedGrowthInfoId | uuid                    | NULL          | NO       |
| usersId          | uuid                    | NULL          | NO       |

---

### **supplies**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| type             | USER-DEFINED            | NULL          | NO       |
| price            | double precision        | NULL          | NO       |

---

### **system**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |
| value            | jsonb                   | NULL          | NO       |
| created_at       | timestamp with time zone| now()         | NO       |

---

### **tiles**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| price            | double precision        | NULL          | NO       |
| max_ownership    | integer                 | NULL          | NO       |
| is_nft           | boolean                 | NULL          | NO       |
| available_in_shop| boolean                 | NULL          | NO       |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **tools**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| available_in     | USER-DEFINED            | NULL          | NO       |
| index            | integer                 | NULL          | NO       |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

---

### **upgrades**
| Column Name      | Data Type                | Default Value | Nullable |
|------------------|--------------------------|---------------|----------|
| id               | character varying (36)  | NULL          | NO       |
| upgrade_price    | integer                 | NULL          | NO       |
| capacity         | integer                 | NULL          | NO       |
| upgrade_level    | integer                 | NULL          | NO       |
| building_id      | character varying (36)  | NULL          | YES      |
| created_at       | timestamp with time zone| now()         | NO       |
| updated_at       | timestamp with time zone| now()         | NO       |

