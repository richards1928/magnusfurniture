import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 6 }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const remaining = Math.max(0, maxImages - images.length);
    const toProcess = Array.from(files).slice(0, remaining);

    if (!toProcess.length) return;

    const readers = toProcess.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    }));

    Promise.all(readers).then((results) => {
      onChange([...images, ...results]);
    });
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#666', marginBottom: 8, display: 'block',
      }}>Product Images ({images.length}/{maxImages})</label>

      {/* Existing images */}
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {images.map((img, i) => (
            <div key={i} style={{
              width: 100, height: 100, borderRadius: 10,
              overflow: 'hidden', position: 'relative',
              border: '1px solid #E5E5E5',
            }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => removeImage(i)}
                style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: 'pointer', padding: 0,
                }}
              ><X size={12} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {images.length < maxImages && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          style={{
            padding: 32, borderRadius: 12,
            border: `2px dashed ${dragOver ? '#3E2723' : '#D4D4D4'}`,
            background: dragOver ? 'rgba(62,39,35,0.03)' : '#FAFAFA',
            textAlign: 'center', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ color: '#AAA', marginBottom: 8 }}>
            {dragOver ? <Image size={32} /> : <Upload size={32} />}
          </div>
          <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
            {dragOver ? 'Drop images here' : 'Click or drag images to upload'}
          </div>
          <div style={{ fontSize: 12, color: '#AAA', marginTop: 4 }}>
            PNG, JPG up to 5MB each
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={e => e.target.files && handleFiles(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
