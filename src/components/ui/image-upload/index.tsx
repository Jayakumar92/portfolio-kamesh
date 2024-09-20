"use client"

import React, { useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"

import "filepond/dist/filepond.min.css"

import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
)

type ImageUploadProps = {
  onImageChange: (base64: string) => void
}

function ImageUpload({ onImageChange }: ImageUploadProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any>([])

  return (
    <FilePond
      allowFileEncode={true}
      onupdatefiles={(_files) => {
        setFiles(_files)
        if (onImageChange) {
          onImageChange(_files[0]?.getFileEncodeBase64String())
        }
      }}
      allowMultiple={false}
      name="files"
      acceptedFileTypes={["image/*"]}
      files={files}
      credits={false}
      allowFileTypeValidation={true}
      allowImageExifOrientation={true}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  )
}

export { ImageUpload }
