import Link from 'next/link';
import VideoGallery from '../videocomponents/VideoGallery';
import '../videocomponents/glimpse.css';

export const metadata = {
  title: 'Video',
};

export default function GlimpsePage() {
  return (
    <>
      {/* Page Banner */}
      <section className="jumbotron page-benner-section ml-6">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-right-button" style={{ paddingTop: 20 }}>
                <Link href="/" className="hvr-fade">
                  Back to
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section
        className="jumbotron page-container background-four ml-6"
        id="section01"
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <VideoGallery />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}