import React, { useState } from "react"
import { Controller } from "react-hook-form"

const CMultiSelectDropdown = ({
  control,
  name,
  options = [],
  valueKey = "id",
  labelKey = "name",
  rules = {},
  defaultValue = [],
  isMultiSelect = true, // Single or multi-select mode
  onChangeCallback = () => {}, // Dynamic callback for onChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter options based on the search term
  const filteredOptions = options.filter((item) =>
    item[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // Handle selection changes
        const handleChange = (selectedValue) => {
          let updatedValue
          if (isMultiSelect) {
            const isSelected = value.includes(selectedValue)
            updatedValue = isSelected
              ? value.filter((id) => id !== selectedValue)
              : [...value, selectedValue]
          } else {
            updatedValue = selectedValue
            setIsDropdownOpen(false) // Close dropdown after single selection
          }

          // Trigger form onChange
          onChange(updatedValue)

          // Call dynamic onChange callback
          onChangeCallback(updatedValue)
        }

        return (
          <div style={styles.container}>
            {/* Input Container */}
            <div
              style={styles.inputContainer}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {isMultiSelect ? (
                <div style={styles.chipContainer}>
                  {value.map((id) => {
                    const item = options.find((opt) => opt[valueKey] === id)
                    return (
                      item && (
                        <div key={id} style={styles.chip}>
                          {item[labelKey]}
                          <span
                            style={styles.chipClose}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleChange(id) // Remove chip on close
                            }}
                          >
                            &times;
                          </span>
                        </div>
                      )
                    )
                  })}
                </div>
              ) : (
                <div style={styles.singleSelectText}>
                  {value
                    ? options.find((item) => item[valueKey] === value)?.[
                        labelKey
                      ]
                    : "Select an option"}
                </div>
              )}

              <i
                className={`pi ${isDropdownOpen ? "pi-angle-up" : "pi-angle-down"} `}
                style={styles.arrow}
              ></i>
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div style={styles.dropdown}>
                {/* Search Input */}
                <input
                  type="text"
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item) => (
                    <div
                      key={item[valueKey]}
                      style={{
                        ...styles.dropdownItem,
                        backgroundColor: isMultiSelect
                          ? value.includes(item[valueKey])
                            ? "#e0e0e0"
                            : "#fff"
                          : value === item[valueKey]
                            ? "#e0e0e0"
                            : "#fff",
                      }}
                      onClick={() => handleChange(item[valueKey])}
                    >
                      {item[labelKey]}
                    </div>
                  ))
                ) : (
                  <div style={styles.noOptions}>No options found</div>
                )}
              </div>
            )}

            {error && <span style={styles.error}>{error.message}</span>}
          </div>
        )
      }}
    />
  )
}

export default CMultiSelectDropdown

// Styles
const styles = {
  container: {
    position: "relative",
    width: "100%",
    fontFamily: "Inter var, sans-serif",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
  },
  chip: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
    borderRadius: "16px",
    padding: "0.375rem 0.75rem",
    fontSize: "15px",
  },
  chipClose: {
    marginLeft: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "2px solid #4b5563",
    width: "17px",
    height: "17px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  singleSelectText: {
    flex: 1,
    fontSize: "14px",
    color: "#555",
  },
  arrow: {
    fontSize: "15px",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "4px",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
  },
  searchInput: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    border: "none",
    borderBottom: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  dropdownItem: {
    padding: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  noOptions: {
    padding: "8px",
    fontSize: "14px",
    color: "#888",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
}
