import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, FileText, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Tesseract from 'tesseract.js';

interface DocumentScannerProps {
  onTextExtracted: (text: string) => void;
  onClose: () => void;
}

export const DocumentScanner = ({ onTextExtracted, onClose }: DocumentScannerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setExtractedText('');
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select an image file.",
        variant: "destructive",
      });
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(
        selectedImage,
        'eng+hin+tam+tel', // Support multiple languages
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
            }
          },
        }
      );

      const text = result.data.text.trim();
      setExtractedText(text);
      
      if (text) {
        toast({
          title: "Text extracted successfully",
          description: `Extracted ${text.length} characters from the image.`,
        });
      } else {
        toast({
          title: "No text found",
          description: "Could not extract any text from the image. Try with a clearer image.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "OCR failed",
        description: "Failed to extract text from the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const useExtractedText = () => {
    if (extractedText) {
      onTextExtracted(extractedText);
      toast({
        title: "Text applied",
        description: "Extracted text has been added to the lyrics field.",
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Scanner
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Input Options */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <Button
              variant="outline"
              onClick={() => cameraInputRef.current?.click()}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Image Preview */}
          {selectedImage && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <img
                  src={selectedImage}
                  alt="Selected document"
                  className="max-w-full h-auto max-h-96 mx-auto rounded"
                />
              </div>

              {/* Process Button */}
              <Button
                onClick={processImage}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing... {progress}%
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Extract Text
                  </>
                )}
              </Button>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Extracted Text:</h3>
                <div className="bg-muted p-3 rounded text-sm whitespace-pre-wrap max-h-48 overflow-auto">
                  {extractedText}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={useExtractedText} className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Use This Text
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setExtractedText('');
                  }}
                >
                  Scan Another
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Tips for better results:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure good lighting and minimal shadows</li>
              <li>• Keep the document flat and in focus</li>
              <li>• Avoid glare and reflections</li>
              <li>• Make sure text is clearly visible</li>
              <li>• For handwritten text, ensure it's legible</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};