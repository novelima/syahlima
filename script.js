// -------- PRODUK ---------
const produk = [
    { id: 1, nama: "Novel Syah - Pelangi Senja", harga: 35000 },
    { id: 2, nama: "Novelima Series 1", harga: 42000 },
    { id: 3, nama: "Novelima Series 2", harga: 45000 }
];

localStorage.setItem("produk", JSON.stringify(produk));


// -------- KATALOG --------
if (document.getElementById("produkList")) {
    const list = JSON.parse(localStorage.getItem("produk"));
    let html = "";
    list.forEach(p => {
        html += `
        <div class="produk-card">
            <h3>${p.nama}</h3>
            <p>Harga: Rp ${p.harga}</p>
            <button onclick="tambahKeranjang(${p.id})">Tambah</button>
        </div>`;
    });
    document.getElementById("produkList").innerHTML = html;
}

function tambahKeranjang(id) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang.push(id);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    alert("Ditambahkan ke keranjang!");
}


// -------- KERANJANG --------
if (document.getElementById("keranjangList")) {
    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    const listProduk = JSON.parse(localStorage.getItem("produk"));
    let total = 0;
    let html = "";

    keranjang.forEach(id => {
        const p = listProduk.find(a => a.id === id);
        total += p.harga;
        html += `<p>${p.nama} - Rp ${p.harga}</p>`;
    });

    document.getElementById("keranjangList").innerHTML = html;
    document.getElementById("totalHarga").textContent = "Rp " + total;
}

function checkout() {
    alert("Checkout berhasil!");
    localStorage.removeItem("keranjang");
    location.reload();
}


// -------- MEMBER --------
if (document.getElementById("formMember")) {
    const form = document.getElementById("formMember");
    const listMember = document.getElementById("listMember");

    form.addEventListener("submit", e => {
        e.preventDefault();
        let nama = document.getElementById("namaMember").value;
        let email = document.getElementById("emailMember").value;

        let data = JSON.parse(localStorage.getItem("member")) || [];
        data.push({ nama, email });
        localStorage.setItem("member", JSON.stringify(data));

        alert("Member terdaftar!");
        location.reload();
    });

    let data = JSON.parse(localStorage.getItem("member")) || [];
    data.forEach(m => {
        let li = document.createElement("li");
        li.textContent = `${m.nama} - ${m.email}`;
        listMember.appendChild(li);
    });
}


// -------- BIODATA --------
if (document.getElementById("formBio")) {
    document.getElementById("formBio").addEventListener("submit", e => {
        e.preventDefault();

        let bio = {
            nama: bioNama.value,
            umur: bioUmur.value,
            tgl: bioTgl.value,
            tinggi: bioTinggi.value,
            berat: bioBerat.value,
            hobby: bioHobby.value,
            alamat: bioAlamat.value,
            email: bioEmail.value
        };

        localStorage.setItem("biodata", JSON.stringify(bio));
        alert("Biodata tersimpan!");
        location.reload();
    });

    let data = JSON.parse(localStorage.getItem("biodata"));
    if (data) {
        document.getElementById("hasilBiodata").innerHTML = `
            <p>Nama: ${data.nama}</p>
            <p>Umur: ${data.umur}</p>
            <p>Tanggal Lahir: ${data.tgl}</p>
            <p>Tinggi: ${data.tinggi} cm</p>
            <p>Berat: ${data.berat} kg</p>
            <p>Hobby: ${data.hobby}</p>
            <p>Alamat: ${data.alamat}</p>
            <p>Email: ${data.email}</p>
        `;
    }
}


// -------- DASHBOARD GRAPH --------
if (document.getElementById("grafikPenjualan")) {
    new Chart(grafikPenjualan, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [{
                label: "Penjualan",
                data: [10, 20, 15, 30],
                borderWidth: 3
            }]
        }
    });

    new Chart(grafikBar, {
        type: "bar",
        data: {
            labels: ["A", "B", "C"],
            datasets: [{
                label: "Tren",
                data: [12, 19, 5]
            }]
        }
    });
}
