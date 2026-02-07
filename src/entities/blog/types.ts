interface UploadResponse {
  message: string;
  successFiles: SuccessResponse[];
  failedFiles: FailResponse[];
}

interface FailResponse {
  fileName: string;
  reason: string;
}

interface SuccessResponse {
  fileName: string;
}
