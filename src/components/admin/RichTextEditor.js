"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Type,
  Palette,
} from "lucide-react"

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontSize, setShowFontSize] = useState(false)

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
    editorRef.current?.focus()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        execCommand("insertImage", e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#800080",
    "#008080",
    "#C0C0C0",
    "#808080",
    "#FFFFFF",
  ]

  const fontSizes = ["1", "2", "3", "4", "5", "6", "7"]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Text Formatting */}
        <Button type="button" size="sm" variant="outline" onClick={() => execCommand("bold")} className="p-2 h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => execCommand("italic")} className="p-2 h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => execCommand("underline")}
          className="p-2 h-8 w-8"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => execCommand("justifyLeft")}
          className="p-2 h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => execCommand("justifyCenter")}
          className="p-2 h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => execCommand("justifyRight")}
          className="p-2 h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => execCommand("insertUnorderedList")}
          className="p-2 h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => execCommand("insertOrderedList")}
          className="p-2 h-8 w-8"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Font Size */}
        <div className="relative">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowFontSize(!showFontSize)}
            className="p-2 h-8 w-8"
          >
            <Type className="h-4 w-4" />
          </Button>
          {showFontSize && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
              {fontSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="block w-full px-3 py-1 text-left hover:bg-gray-100"
                  onClick={() => {
                    execCommand("fontSize", size)
                    setShowFontSize(false)
                  }}
                >
                  Size {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div className="relative">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 h-8 w-8"
          >
            <Palette className="h-4 w-4" />
          </Button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 p-2">
              <div className="grid grid-cols-8 gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      execCommand("foreColor", color)
                      setShowColorPicker(false)
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Link */}
        <Button type="button" size="sm" variant="outline" onClick={insertLink} className="p-2 h-8 w-8 bg-transparent">
          <LinkIcon className="h-4 w-4" />
        </Button>

        {/* Image */}
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            className="p-2 h-8 w-8"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Heading Styles */}
        <select
          onChange={(e) => {
            execCommand("formatBlock", e.target.value)
            e.target.value = ""
          }}
          className="px-2 py-1 border border-gray-300 rounded text-sm h-8"
          defaultValue=""
        >
          <option value="">Style</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none bg-white"
        onInput={handleInput}
        style={{
          lineHeight: "1.6",
          fontFamily: "system-ui, -apple-system, sans-serif",
          direction: "ltr",
          textAlign: "left",
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}
