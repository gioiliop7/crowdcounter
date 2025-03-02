export default function Footer() {
  return (
    <>
      <footer className="w-full bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Σχετικά με την εφαρμογή
              </h3>
              <p className="text-gray-400 text-sm">
                Αυτή η εφαρμογή προσπαθεί να αποτυπώσει σε νούμερα την παρουσία
                του κόσμου σε όλη τη χώρα στις στις 28/02/2025. Μία μέρα που
                είμασταν όλοι ενωμένοι. Όλοι μια γροθιά.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © Όλα τα δικαιώματα διατηρούνται.
            </p>
            <p className="text-gray-500 text-sm">Giorgos Iliopoulos</p>
            <p className="text-gray-500 text-sm">v1.1</p>
          </div>
        </div>
      </footer>
    </>
  );
}
